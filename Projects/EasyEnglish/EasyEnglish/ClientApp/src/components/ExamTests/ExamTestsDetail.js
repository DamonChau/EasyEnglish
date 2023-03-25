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
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var contants_1 = require("../../Helpers/contants");
var Stores_1 = require("../../Redux/Stores");
var examTests_1 = require("../../Redux/Services/examTests");
var authSlice_1 = require("../../Redux/Slices/authSlice");
var react_draft_wysiwyg_1 = require("react-draft-wysiwyg");
var draft_js_1 = require("draft-js");
require("react-draft-wysiwyg/dist/react-draft-wysiwyg.css");
var validator_1 = require("validator");
require("../../../src/App.css");
var Snackbar_1 = require("@mui/material/Snackbar");
var Alert_1 = require("@mui/material/Alert");
var Alert = React.forwardRef(function Alert(props, ref) {
    return React.createElement(Alert_1.default, __assign({ elevation: 6, ref: ref, variant: "filled" }, props));
});
var ExamTestsDetail = function () {
    var id = (0, react_router_dom_1.useParams)().id;
    var _a = (0, react_1.useState)(false), isEditing = _a[0], setIsEditing = _a[1];
    var _b = (0, react_1.useState)(function () { return draft_js_1.EditorState.createEmpty(); }), editorState = _b[0], setEditorState = _b[1];
    var loggedUser = (0, Stores_1.useTypedSelector)(authSlice_1.selectLoggedUser);
    var initialValue = { testName: '', title: '', content: '', description: '', testType: 1, status: 1, createdBy: loggedUser.id };
    var _c = (0, react_1.useState)(initialValue), examTest = _c[0], setexamTest = _c[1];
    var _d = [null, false, false, false, false, ''], data = _d[0], isFetching = _d[1], isLoading = _d[2], isSuccess = _d[3], isError = _d[4], error = _d[5];
    var _e = (0, examTests_1.useUpdateExamTestMutation)(), updateExamTest = _e[0], _f = _e[1], isUpdateLoading = _f.isLoading, isUpdateError = _f.isError, errorUpdate = _f.error;
    var _g = (0, examTests_1.useAddExamTestMutation)(), addExamTest = _g[0], _h = _g[1], isAddLoading = _h.isLoading, isAddError = _h.isError, errorAdd = _h.error;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _j = (0, react_1.useState)(false), open = _j[0], setOpen = _j[1];
    var handleClose = function (event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    (0, react_1.useEffect)(function () {
        id && validator_1.default.isUUID(id) ? setIsEditing(true) : setIsEditing(false);
        if (isEditing) {
            var _a = (0, examTests_1.useGetExamTestQuery)(id), data_1 = _a.data, isFetching_1 = _a.isFetching, isLoading_1 = _a.isLoading, isSuccess_1 = _a.isSuccess, isError_1 = _a.isError, error_1 = _a.error;
            setexamTest((0, react_1.useRef)(data_1));
        }
    }, []);
    (0, react_1.useEffect)(function () {
        var r = JSON.stringify((0, draft_js_1.convertToRaw)(editorState.getCurrentContent()));
        var s = (0, draft_js_1.convertFromRaw)(JSON.parse(r));
        //save content to examTest
        //setexamTest((prev) => ({
        //    ...prev,
        //    content: html,
        //}))
        console.log("4");
    }, []);
    var handleCancel = function (e) {
        navigate(contants_1.config.url.API_URL_FOLDER + "/admin/examTestsManager");
    };
    var handleSave = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    if (!isEditing) return [3 /*break*/, 3];
                    return [4 /*yield*/, updateExamTest(data).unwrap()];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, addExamTest(examTest).unwrap()];
                case 4:
                    _a = _b.sent();
                    _b.label = 5;
                case 5:
                    _a;
                    setOpen(true);
                    setexamTest(initialValue);
                    clearFields(e);
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _b.sent();
                    setOpen(false);
                    console.debug(e_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    function clearFields(e) {
        Array.from(e.target).forEach(function (e) { return (e.value = ""); });
        setEditorState(draft_js_1.EditorState.createWithContent(draft_js_1.ContentState.createFromText('')));
    }
    var handleChange = function (e) {
        setexamTest(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[e.target.name] = e.target.value, _a)));
        });
    };
    var uploadImageCallBack = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', contants_1.config.url.API_URL + '/api/FilesUpload/upload');
                    xhr.setRequestHeader('Authorization', 'Client-ID ##clientid##');
                    var data = new FormData();
                    data.append('image', file);
                    xhr.send(data);
                    xhr.addEventListener('load', function () {
                        resolve(JSON.parse(xhr.responseText));
                    });
                })];
        });
    }); };
    var renderEditForm = function () {
        return (React.createElement("form", { onSubmit: handleSave },
            React.createElement(Snackbar_1.default, { open: open, autoHideDuration: 6000, onClose: handleClose, anchorOrigin: { vertical: 'top', horizontal: 'center' } },
                React.createElement(Alert, { onClose: handleClose, severity: "success", sx: { width: '100%' } }, "Save successfully!")),
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "id", value: examTest.id })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "testType" }, "Test Type"),
                React.createElement("select", { className: "form-control", name: "testType", value: examTest.testType, onChange: handleChange },
                    React.createElement("option", { value: "1" }, "IELTS"),
                    React.createElement("option", { value: "2" }, "PTE"),
                    React.createElement("option", { value: "3" }, "GE"))),
            React.createElement("div", { className: "form-group" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "testName" }, "Test name"),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("input", { className: "form-control", type: "text", name: "testName", defaultValue: examTest.testName, onChange: handleChange })))),
            React.createElement("div", { className: "form-group" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "title" }, "Title"),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("input", { className: "form-control", type: "text", name: "title", defaultValue: examTest.title, onChange: handleChange })))),
            React.createElement("div", { className: "form-group" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "description" }, "Description"),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("input", { className: "form-control", type: "text", name: "description", defaultValue: examTest.description, onChange: handleChange })))),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "content" }, "Content"),
                React.createElement("div", { className: "form-group" },
                    React.createElement(react_draft_wysiwyg_1.Editor, { editorState: editorState, wrapperClassName: "wrapper-class", editorClassName: "editor-class", toolbarClassName: "toolbar-class", onEditorStateChange: setEditorState, toolbar: {
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                            image: { uploadCallback: uploadImageCallBack, alt: { present: false, mandatory: false }, previewImage: true, inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg', },
                        } }))),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "testType" }, "Status"),
                React.createElement("select", { className: "form-control", name: "status", value: examTest.status, onChange: handleChange },
                    React.createElement("option", { value: "1" }, "Active"),
                    React.createElement("option", { value: "2" }, "Inactive"))),
            React.createElement("button", { className: "btn btn-primary py-2 px-3 py-3 mr-2", type: "submit" }, "Save"),
            React.createElement("button", { className: "btn btn-primary py-2 px-3 py-3", type: "button", onClick: handleCancel }, "Cancel")));
    };
    return (React.createElement("div", null,
        React.createElement("section", { className: "hero-wrap hero-wrap-2", style: { backgroundImage: 'url("images/bg_1.jpg")' }, "data-stellar-background-ratio": "0.5" },
            React.createElement("div", { className: "overlay" }),
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                    React.createElement("div", { className: "col-md-9 text-center" },
                        React.createElement("h1", { className: "mb-2 bread" }, "Exam Test Edit"),
                        React.createElement("p", { className: "breadcrumbs" },
                            React.createElement("span", { className: "mr-2" },
                                React.createElement("a", { href: "/" },
                                    "Home ",
                                    React.createElement("i", { className: "ion-ios-arrow-forward" }))),
                            " ",
                            React.createElement("span", null,
                                "Exam Test Edit ",
                                React.createElement("i", { className: "ion-ios-arrow-forward" }))))))),
        React.createElement("section", { className: "ftco-section" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-8" },
                        React.createElement("h2", { className: "mb-3" }, "Exam Test Edit Form"),
                        React.createElement("div", null, renderEditForm())),
                    React.createElement("div", { className: "col-lg-4 sidebar ftco-animate" }))))));
};
exports.default = ExamTestsDetail;
//# sourceMappingURL=ExamTestsDetail.js.map