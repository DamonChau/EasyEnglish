"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var Stores_1 = require("../../Redux/Stores");
var authSlice_1 = require("../../Redux/Slices/authSlice");
var PrivateRoute = function () {
    var isAuthenticated = (0, Stores_1.useTypedSelector)(authSlice_1.selectIsAuthenticated);
    var location = (0, react_router_dom_1.useLocation)();
    return isAuthenticated ? React.createElement(react_router_dom_1.Outlet, null) : React.createElement(react_router_dom_1.Navigate, { to: "/login", replace: true, state: { from: location } });
};
exports.default = PrivateRoute;
//# sourceMappingURL=PrivateRoute.js.map