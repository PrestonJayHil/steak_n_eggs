require('dotenv').config();

const express = require('express');
const prexit = require('prexit');
const helmet = require('helmet');
const debug = require('debug');
const httpDebug = debug('sne:http');
const dbDebug = debug('sne:db');
const { Sequelize, QueryTypes } = require('sequelize');
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
    dbDebug('/orders');
    // verify order contents
    // respond with invoice
    return res.status(201).json('ok');
});

app.get('/orders/:id', validateJWT, async (req, res) => {
    const order_id = req.params.id;
    dbDebug(`/orders/${order_id}`);
    // lookup order
    // check ordered by === req.user.user_id
    return res.status(200).json('order');
});

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
