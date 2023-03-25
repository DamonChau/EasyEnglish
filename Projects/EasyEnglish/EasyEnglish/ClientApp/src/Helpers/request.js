"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var contants_1 = require("../Helpers/contants");
var requests = function (options) {
    var token = '';
    var client = axios_1.default.create({
        baseURL: contants_1.config.url.API_URL,
        timeout: 100,
        headers: { 'Authorization': "".concat(token) }
    });
    var onSuccess = function (response) {
        console.debug('Request Successful!', [response]);
        return response.data;
    };
    var onError = function (error) {
        console.error('Request Failed:', error.config);
        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
        }
        else {
            // Something else happened while setting up the request
            // triggered the error
            console.error('Error Message:', error.message);
        }
        return Promise.reject(error.response || error.message);
    };
    return client(options)
        .then(onSuccess)
        .catch(onError);
};
exports.default = requests;
//# sourceMappingURL=request.js.map