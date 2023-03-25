"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var contants_1 = require("../../Helpers/contants");
var react_router_dom_1 = require("react-router-dom");
var Stores_1 = require("../../Redux/Stores");
var authSlice_1 = require("../../Redux/Slices/authSlice");
var Header = function () {
    var isAuthenticated = (0, Stores_1.useTypedSelector)(authSlice_1.selectIsAuthenticated);
    var navigate = (0, react_router_dom_1.useNavigate)();
    var dispatch = (0, Stores_1.useAppDispatch)();
    var clickLogout = function () {
        dispatch((0, authSlice_1.logout)());
        navigate(contants_1.config.url.API_URL_FOLDER + "/");
    };
    (0, react_1.useEffect)(function () {
    }, []);
    return (React.createElement("div", null,
        React.createElement("nav", { className: "navbar py-4 navbar-expand-lg ftco_navbar navbar-light bg-light flex-row" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row no-gutters d-flex align-items-start align-items-center px-3 px-md-0" },
                    React.createElement("div", { className: "col-lg-2 pr-4 align-items-center" },
                        React.createElement("a", { className: "navbar-brand", href: "index.html" },
                            "Easy",
                            React.createElement("span", null, "English"))),
                    React.createElement("div", { className: "col-lg-10 d-none d-md-block" },
                        React.createElement("div", { className: "row d-flex" },
                            React.createElement("div", { className: "col-md-4 pr-4 d-flex topper align-items-center" },
                                React.createElement("div", { className: "icon bg-white mr-2 d-flex justify-content-center align-items-center" },
                                    React.createElement("span", { className: "icon-map" })),
                                React.createElement("span", { className: "text" }, "Address:")),
                            React.createElement("div", { className: "col-md pr-4 d-flex topper align-items-center" },
                                React.createElement("div", { className: "icon bg-white mr-2 d-flex justify-content-center align-items-center" },
                                    React.createElement("span", { className: "icon-paper-plane" })),
                                React.createElement("span", { className: "text" }, "Email: ee@email.com")),
                            React.createElement("div", { className: "col-md pr-4 d-flex topper align-items-center" },
                                React.createElement("div", { className: "icon bg-white mr-2 d-flex justify-content-center align-items-center" },
                                    React.createElement("span", { className: "icon-phone2" })),
                                React.createElement("span", { className: "text" }, "Phone: + 1235 2355 98"))))))),
        React.createElement("nav", { className: "navbar navbar-expand-lg ftco-navbar-light", id: "ftco-navbar" },
            React.createElement("div", { className: "container d-flex align-items-center" },
                React.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#ftco-nav", "aria-controls": "ftco-nav", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                    React.createElement("span", { className: "oi oi-menu" }),
                    " Menu"),
                React.createElement("p", { className: "button-custom order-lg-last mb-0" },
                    React.createElement("a", { href: "appointment.html", className: "btn btn-secondary py-2 px-3" }, "Make An Appointment")),
                React.createElement("div", { className: "collapse navbar-collapse", id: "ftco-nav" },
                    React.createElement("ul", { className: "navbar-nav me-auto mb-2 mb-lg-0" },
                        React.createElement("li", { className: "nav-item" },
                            React.createElement(react_router_dom_1.Link, { className: "nav-link", to: contants_1.config.url.API_URL_FOLDER + "/" }, "Home")),
                        React.createElement("li", { className: "nav-item" },
                            React.createElement(react_router_dom_1.Link, { className: "nav-link", to: contants_1.config.url.API_URL_FOLDER + "/about" }, "About")),
                        React.createElement("li", { className: "nav-item" },
                            React.createElement(react_router_dom_1.Link, { className: "nav-link", to: contants_1.config.url.API_URL_FOLDER + "/lessons" }, "Lessons")),
                        React.createElement("li", { className: "nav-item" },
                            React.createElement(react_router_dom_1.Link, { className: "nav-link", to: contants_1.config.url.API_URL_FOLDER + "/teachers" }, "Teachers")),
                        React.createElement("li", { className: "nav-item" },
                            React.createElement(react_router_dom_1.Link, { className: "nav-link", to: contants_1.config.url.API_URL_FOLDER + "/pricing" }, "Pricing")),
                        React.createElement("li", { className: "nav-item" },
                            React.createElement(react_router_dom_1.Link, { className: "nav-link", to: contants_1.config.url.API_URL_FOLDER + "/tests" }, "Tests")),
                        React.createElement("li", { className: "nav-item" },
                            React.createElement(react_router_dom_1.Link, { className: "nav-link", to: contants_1.config.url.API_URL_FOLDER + "/contact" }, "Contact")),
                        !isAuthenticated && React.createElement("li", { className: "nav-item" },
                            React.createElement("a", { href: "/login", className: "nav-link" }, "Login")),
                        isAuthenticated &&
                            React.createElement("li", { className: "nav-item dropdown" },
                                React.createElement("a", { className: "nav-link dropdown-toggle", href: "/admin", id: "navbarDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false" }, "Admin"),
                                React.createElement("ul", { className: "dropdown-menu", "aria-labelledby": "navbarDropdown" },
                                    React.createElement("li", { className: "nav-item" },
                                        React.createElement(react_router_dom_1.Link, { className: "nav-link", to: contants_1.config.url.API_URL_FOLDER + "/admin/examTestsManager" }, "Exam Tests Manager")),
                                    React.createElement("li", { role: "separator", className: "divider" }),
                                    React.createElement("li", { className: "nav-item" },
                                        React.createElement("a", { role: "button", className: "nav-link", onClick: function (e) { return clickLogout(); } }, "Logout"))))))))));
};
exports.default = Header;
//# sourceMappingURL=Header.js.map