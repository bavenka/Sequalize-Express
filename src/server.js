import express from 'express';
import { ValidationError } from 'express-validation';
import bodyParser from 'body-parser';

import {ERROR_TYPES} from './server-error/constants';

import connect from '../src/connect';

import userRoute from './routes/UserRoute';
import ErrorBase from './server-error';

const {sequelize} = connect;
const app = express();

app.use(bodyParser.json());
app.use('/users', userRoute);

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
    .catch((err) => console.error('Unable to connect to the database:', err));
