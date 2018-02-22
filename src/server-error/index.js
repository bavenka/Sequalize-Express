import { ERROR_TYPES } from './constants'

function ErrorBase(type, status, message, fileName, lineNumber) {
    var instance = new Error(message, fileName, lineNumber);
    instance.type = type || ERROR_TYPES.DEFAULT;
    instance.status = status || 500;
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, ErrorBase);
    }
    return instance;
}

ErrorBase.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
});

if (Object.setPrototypeOf){
    Object.setPrototypeOf(ErrorBase, Error);
} else {
    ErrorBase.__proto__ = Error;
}

export default ErrorBase;
