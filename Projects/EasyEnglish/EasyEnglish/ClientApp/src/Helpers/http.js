"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = void 0;
var axios_1 = require("axios");
var contants_1 = require("../Helpers/contants");
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["Unauthorized"] = 401] = "Unauthorized";
    StatusCode[StatusCode["Forbidden"] = 403] = "Forbidden";
    StatusCode[StatusCode["TooManyRequests"] = 429] = "TooManyRequests";
    StatusCode[StatusCode["InternalServerError"] = 500] = "InternalServerError";
})(StatusCode || (StatusCode = {}));
var headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
};
// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
var injectToken = function (mconfig) {
    try {
        var token = localStorage.getItem("accessToken");
        if (token != null) {
            mconfig.headers.Authorization = "Bearer ".concat(token);
        }
        return mconfig;
    }
    catch (error) {
        throw new Error(error);
    }
};
var Http = /** @class */ (function () {
    function Http() {
        this.instance = null;
    }
    Object.defineProperty(Http.prototype, "http", {
        get: function () {
            return this.instance != null ? this.instance : this.initHttp();
        },
        enumerable: false,
        configurable: true
    });
    Http.prototype.initHttp = function () {
        var _this = this;
        var http = axios_1.default.create({
            baseURL: contants_1.config.url.API_URL,
            headers: headers,
            withCredentials: true,
        });
        http.interceptors.request.use(injectToken, function (error) { return Promise.reject(error); });
        http.interceptors.response.use(function (response) { return response; }, function (error) {
            var response = error.response;
            return _this.handleError(response);
        });
        this.instance = http;
        return http;
    };
    Http.prototype.request = function (config) {
        return this.http.request(config);
    };
    Http.prototype.get = function (url, config) {
        return this.http.get(url, config);
    };
    Http.prototype.post = function (url, data, config) {
        return this.http.post(url, data, config);
    };
    Http.prototype.put = function (url, data, config) {
        return this.http.put(url, data, config);
    };
    Http.prototype.delete = function (url, config) {
        return this.http.delete(url, config);
    };
    // Handle global app errors
    // We can handle generic app errors depending on the status code
    Http.prototype.handleError = function (error) {
        var status = error.status;
        switch (status) {
            case StatusCode.InternalServerError: {
                // Handle InternalServerError
                break;
            }
            case StatusCode.Forbidden: {
                // Handle Forbidden
                break;
            }
            case StatusCode.Unauthorized: {
                // Handle Unauthorized
                break;
            }
            case StatusCode.TooManyRequests: {
                // Handle TooManyRequests
                break;
            }
        }
        return Promise.reject(error);
    };
    return Http;
}());
exports.http = new Http();
//# sourceMappingURL=http.js.map