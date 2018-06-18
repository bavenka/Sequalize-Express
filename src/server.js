import express from 'express';
import { ValidationError } from 'express-validation';
import bodyParser from 'body-parser';
import cors from 'cors';

import {ERROR_TYPES} from './server-error/constants';

import connect from '../src/database/connect';
import { initTables } from '../src/database/utils';

import authRoute from './routes/AuthRoute';
import userRoute from './routes/UserRoute';
import roleRoute from './routes/RoleRoute';
import categoryRoute from './routes/CategoryRoute';
import productRoute from './routes/ProductRoute';
import reservationRoute from './routes/ReservationRoute';
import orderRoute from './routes/OrderRoute';

import ErrorBase from './server-error';

const {sequelize} = connect;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', authRoute);
app.use('/users', userRoute);
app.use('/roles', roleRoute);
app.use('/categories', categoryRoute);
app.use('/products', productRoute);
app.use('/reservations', reservationRoute);
app.use('/orders', orderRoute);

app.use((err, req, res, next) => {
    if (err instanceof ErrorBase) {
        res.status(err.status).json({type: err.type, error: err.message});
    }
    else if (err instanceof ValidationError) {
        res.status(err.status).json({type: ERROR_TYPES.VALIDATION_ERROR, error: err.errors})
    }
    else {
        res.status(500).json({type: ERROR_TYPES.DEFAULT, error: err.message});
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        app.listen(4000, () => console.log('Express server is running.'));
    })
    .then(() => initTables())
    .catch((err) => console.error('Unable to connect to the database:', err));
