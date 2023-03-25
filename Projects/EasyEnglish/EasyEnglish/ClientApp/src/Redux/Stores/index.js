"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTypedSelector = exports.useAppDispatch = exports.persistor = exports.store = exports.createStore = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var react_redux_1 = require("react-redux");
var api_1 = require("../Services/api");
var authSlice_1 = require("../Slices/authSlice");
var storage_1 = require("redux-persist/lib/storage");
var redux_persist_1 = require("redux-persist");
var redux_1 = require("redux");
var autoMergeLevel2_1 = require("redux-persist/lib/stateReconciler/autoMergeLevel2");
var persistConfig = {
    key: 'root',
    storage: storage_1.default,
    whitelist: ['auth'],
    blacklist: [],
    stateReconciler: autoMergeLevel2_1.default
};
var rootReducer = (0, redux_1.combineReducers)((_a = {},
    _a[api_1.api.reducerPath] = api_1.api.reducer,
    _a.auth = authSlice_1.default,
    _a));
var pReducer = (0, redux_persist_1.persistReducer)(persistConfig, rootReducer);
var createStore = function (options) {
    return (0, toolkit_1.configureStore)(__assign({ reducer: pReducer, middleware: function (getDefaultMiddleware) {
            return getDefaultMiddleware({
                serializableCheck: false,
            }).concat(api_1.api.middleware);
        } }, options));
};
exports.createStore = createStore;
exports.store = (0, exports.createStore)();
exports.persistor = (0, redux_persist_1.persistStore)(exports.store);
exports.useAppDispatch = react_redux_1.useDispatch;
exports.useTypedSelector = react_redux_1.useSelector;
//# sourceMappingURL=index.js.map