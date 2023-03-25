"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var examTests_1 = require("../../Redux/Services/examTests");
var react_redux_1 = require("react-redux");
var authSlice_1 = require("../../Redux/Slices/authSlice");
var contants_1 = require("../../Helpers/contants");
var Login = function () {
    var _a = (0, examTests_1.useLoginMutation)(), login = _a[0], result = _a[1];
    var isAuthenticated = (0, react_redux_1.useSelector)(authSlice_1.selectIsAuthenticated);
    var _b = (0, react_1.useState)(''), userName = _b[0], setUserName = _b[1];
    var _c = (0, react_1.useState)(''), password = _c[0], setPassword = _c[1];
    var _d = (0, react_1.useState)(false), isError = _d[0], setisError = _d[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        if (isAuthenticated) {
            navigate(contants_1.config.url.API_URL_FOLDER + "/");
        }
    }, [isAuthenticated]);
    var postLogin = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var u, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    u = {};
                    u.userName = userName;
                    u.password = password;
                    return [4 /*yield*/, login(u).unwrap()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", null,
        React.createElement("section", { className: "hero-wrap hero-wrap-2", style: { backgroundImage: 'url("images/bg_1.jpg")' }, "data-stellar-background-ratio": "0.5" },
            React.createElement("div", { className: "overlay" }),
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                    React.createElement("div", { className: "col-md-9 text-center" },
                        React.createElement("h1", { className: "mb-2 bread" }, "Login"),
                        React.createElement("p", { className: "breadcrumbs" },
                            React.createElement("span", { className: "mr-2" },
                                React.createElement("a", { href: "/" },
                                    "Home ",
                                    React.createElement("i", { className: "ion-ios-arrow-forward" }))),
                            " ",
                            React.createElement("span", null,
                                "Login ",
                                React.createElement("i", { className: "ion-ios-arrow-forward" }))))))),
        React.createElement("section", { className: "ftco-section ftco-no-pt ftco-no-pb contact-section" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "h-100 d-flex align-items-center justify-content-center" },
                    React.createElement("div", { className: "col-md-4 p-4 p-md-4 order-md-last bg-light" },
                        React.createElement("form", { onSubmit: postLogin },
                            React.createElement("div", { className: "form-group" },
                                React.createElement("input", { type: "text", className: "form-control", placeholder: "User Name", value: userName, onChange: function (e) { setUserName(e.target.value); } })),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("input", { type: "password", className: "form-control", placeholder: "Password", value: password, onChange: function (e) { setPassword(e.target.value); } })),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("input", { type: "submit", defaultValue: "Login", className: "btn btn-primary py-3 px-5" })))))))));
};
exports.default = Login;
//# sourceMappingURL=Login.js.map