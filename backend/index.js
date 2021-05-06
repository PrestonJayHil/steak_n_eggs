require('dotenv').config();

const express = require('express');
const prexit = require('prexit');
const helmet = require('helmet');
const debug = require('debug');
const httpDebug = debug('sne:http');
const dbDebug = debug('sne:db');
const { Sequelize, QueryTypes, DataTypes } = require('sequelize');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const serverPort = process.env.SNE_PORT || 3030;
const app = express();
const httpServer = require('http').createServer(app);

app.use(cors());
app.use(helmet());
app.use(express.json());

const validateJWT = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.SNE_AUTH0_JWKS_URI,
    }),
    audience: `http://localhost:${serverPort}`,
    issuer: process.env.SNE_AUTH0_ISSUER,
    algorithms: ['RS256'],
});

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.SNE_DB_DATABASE,

    host: process.env.SNE_DB_HOST,
    username: process.env.SNE_DB_USER,
    password: process.env.SNE_DB_PASSWORD,
    port: process.env.SNE_DB_PORT,

    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    },
});

const OrderItems = sequelize.define('order_items', {
    order_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    item_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    item_price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    item_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
            min: 1,
        },
    },
});

(async function() {
    try {
        await sequelize.authenticate();
        dbDebug('connection ok');
    } catch (err) {
        dbDebug(err);
    }
})();

app.post('/orders', validateJWT, async (req, res) => {
    dbDebug('post /orders');

    const { user, body } = req;
    const email = user[`http://localhost:${serverPort}/email`];

    const userOrderEntries = Object.entries(body);
    if (userOrderEntries.length === 0) {
        return res.sendStatus(400);
    }

    let itemIds;
    const itemPrices = {};
    try {
        const items = await sequelize.query(
            'select item_id, item_price from item',
            {
                type: QueryTypes.SELECT,
                raw: true,
            },
        );
        itemIds = new Set(items.map(({ item_id }) => (item_id)));
        items.forEach(({ item_id, item_price }) => { itemPrices[item_id] = item_price; });
    } catch (_) {
        return res.sendStatus(500);
    }

    try {
        const { order_id } = await sequelize.transaction(async (t) => {
            const [order] = await sequelize.query(
                'INSERT INTO sne_order (order_author) VALUES (?) RETURNING order_id, order_created',
                {
                    plain: true,
                    raw: true,
                    type: QueryTypes.INSERT,
                    replacements: [email],
                    transaction: t,
                },
            );
            const { order_id, order_created } = order;
            await OrderItems.bulkCreate(
                userOrderEntries.map(([item_id, quantity]) => {
                    if (!itemIds.has(item_id)) {
                        return false;
                    }
                    return {
                        order_id,
                        item_id,
                        item_price: itemPrices[item_id],
                        item_quantity: quantity,
                    }
                }).filter(Boolean),
                {
                    validate: true,
                    transaction: t,
                },
            );
            return { order_id, order_created };
        });

        return res.status(201).json(order_id);
    } catch (_) {
        return res.sendStatus(500);
    }
});

const getOrders = async (req, res) => {
    const order_id = req.params.id;
    const email = req.user[`http://localhost:${serverPort}/email`];
    try {
        const orders = await sequelize.query(
            `select
                sne_order.order_id,
                sne_order.order_author,
                sne_order.order_created,
                json_agg(json_build_object(
                    'item_id', item.item_id,
                    'item_title', item.item_title,
                    'item_desc', item.item_desc,
                    'item_quantity', order_items.item_quantity,
                    'item_price', order_items.item_price
                )) as items,
                SUM(item_quantity * order_items.item_price) as total
            from sne_order join order_items using(order_id) join item using(item_id)
            where (
                ${order_id ? `sne_order.order_id = ? and` : ''}
                sne_order.order_author = ?
            )
            group by order_id, order_created
            order by order_created desc`,
            {
                raw: true,
                type: QueryTypes.SELECT,
                replacements: order_id ? [order_id, email] : [email],
            },
        );
        return res.status(200).json(orders);
    } catch (_) {
        return res.sendStatus(500);
    }
}

app.get('/orders', validateJWT, (_, __, next) => {
    dbDebug('get /orders');
    next();
}, getOrders);

app.get('/orders/:id', validateJWT, (req, __, next) => {
    dbDebug(`get /orders/${req.params.id}`);
    next();
}, getOrders);

app.get('/menus', async (req, res) => {
    dbDebug('/menus');
    let menus;
    try {
        menus = await sequelize.query(
            'SELECT * FROM menu',
            {
                raw: true,
                type: QueryTypes.SELECT
            }
        );
    } catch (_) {
        return res.sendStatus(500);
    }

    const menuWithItems = await Promise.all(Array.from(menus, (menu) => {
        return sequelize.query(
            `select
                itm.item_id,
                itm.item_title,
                itm.item_desc,
                itm.item_price,
                itm.category_name
            from ((menu_items join item using(item_id)) mi
                join item_category ic on mi.item_category = ic.category_id) itm
            where menu_id = ?`,
            {
                raw: true,
                type: QueryTypes.SELECT,
                replacements: [menu.menu_id],
            }
        ).then((items) => ({
            ...menu,
            items,
        })).catch((_) => ({}));
    }));

    return res.status(200).json(menuWithItems);
});

app.get('/menus/:id', async ({ params: { id } }, res) => {
    dbDebug(`/menus/${id}`);
    let selectedMenu;
    try {
        [selectedMenu] = await sequelize.query(
            'SELECT * FROM menu WHERE menu_id = ?',
            {
                raw: true,
                type: QueryTypes.SELECT,
                replacements: [id],
            },
        );
    } catch (_) {
        //
    }

    if (!selectedMenu) {
        return res.sendStatus(404);
    }

    try {
        const items = await sequelize.query(
            `select
                itm.item_id,
                itm.item_title,
                itm.item_desc,
                itm.item_price,
                itm.category_name
            from ((menu_items join item using(item_id)) mi
                join item_category ic on mi.item_category = ic.category_id) itm
            where menu_id = ?`,
            {
                raw: true,
                type: QueryTypes.SELECT,
                replacements: [selectedMenu.menu_id],
            },
        );
        return res.status(200).json({
            ...selectedMenu,
            items,
        });
    } catch (_) {
        return res.sendStatus(500);
    }
});

httpServer.listen(serverPort, () => {
    httpDebug(`Started at localhost:${serverPort}`);
});

prexit(async () => {
    sequelize.close();
});
