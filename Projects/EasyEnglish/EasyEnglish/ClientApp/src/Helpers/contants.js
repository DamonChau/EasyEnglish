"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.messageDuplication = exports.messageGetFailure = exports.messageSubmitFailure = exports.messageSubmitSuccess = exports.messageSaveFailure = exports.messageSaveSuccess = exports.alertSuccess = exports.alertInfo = exports.alertWarning = exports.alertError = void 0;
exports.alertError = 'error';
exports.alertWarning = 'warning';
exports.alertInfo = 'info';
exports.alertSuccess = 'success';
exports.messageSaveSuccess = 'Save successfully!!!';
exports.messageSaveFailure = 'Save unsuccessfully!!!';
exports.messageSubmitSuccess = 'Submit successfully!!!';
exports.messageSubmitFailure = 'Submit unsuccessfully!!!';
exports.messageGetFailure = 'Get data unsuccessfully!!!';
exports.messageDuplication = 'Duplicate date!!!';
var prod = {
    url: {
        API_URL_FOLDER: '/EasyEnglish',
        //API_URL: 'http://117.20.66.140:8080/GCH'
        API_URL: 'https://gchweb.azurewebsites.net/'
    }
};
var dev = {
    url: {
        API_URL_FOLDER: '',
        API_URL: 'http://localhost:7728'
    }
};
exports.config = process.env.NODE_ENV === 'development' ? dev : prod;
//# sourceMappingURL=contants.js.map