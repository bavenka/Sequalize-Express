import express from 'express';
import bodyParser from 'body-parser';

import connect from '../src/connect';

const { sequelize } = connect;
const app = express();

app.use(bodyParser.json());

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        app.listen(4000, ()=> console.log('Express server is running.'));
    })
    .catch((err) => console.error('Unable to connect to the database:', err));
