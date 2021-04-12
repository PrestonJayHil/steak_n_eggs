require('dotenv').config();

const express = require('express');
const prexit = require('prexit');
const helmet = require('helmet');
const debug = require('debug');
const httpDebug = debug('sne:http');
const dbDebug = debug('sne:db');
const { Sequelize, QueryTypes } = require('sequelize');

const app = express();
const httpServer = require('http').createServer(app);

app.use(helmet());
app.use(express.json());

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

app.get('/menu', async (req, res) => {
    dbDebug('/menu');
    let curMenu;
    try {
        [curMenu] = await sequelize.query(
            'SELECT * FROM menu WHERE ? between menu_start_time AND menu_end_time',
            {
                type: QueryTypes.SELECT,
                replacements: [new Date().toLocaleTimeString()],
            },
        );
    } catch (_) {
        return res.sendStatus(500);
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
                type: QueryTypes.SELECT,
                replacements: [curMenu.menu_id],
            },
        );
        return res.status(200).json({
            ...curMenu,
            items,
        });
    } catch (_) {
        return res.sendStatus(500);
    }
});

const serverPort = process.env.SNE_PORT || 3030;
httpServer.listen(serverPort, () => {
    httpDebug(`Started at localhost:${serverPort}`);
});

prexit(async () => {
    sequelize.close();
});
