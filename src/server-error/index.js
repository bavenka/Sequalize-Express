import { ERROR_TYPES } from './constants'

export default class ServerError extends Error {
    constructor(message, type, status) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.type = type || ERROR_TYPES.DEFAULT;
        this.status = status || 500;
    }
}