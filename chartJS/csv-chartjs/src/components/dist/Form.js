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
        while (_) try {
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
exports.__esModule = true;
var react_1 = require("react");
require("../style/style.scss");
function Form(props) {
    var setUserData = props.setUserData, dataSaved = props.dataSaved, userData = props.userData;
    function getYears() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    }
    function setyears(ev) {
        return __awaiter(this, void 0, void 0, function () {
            var min, max, tempData, tempChartData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ev.preventDefault();
                        min = ev.target.elements.min.value;
                        max = ev.target.elements.max.value;
                        tempData = dataSaved.filter(function (obj) { return obj.Year >= min && obj.Year <= max; });
                        console.log(tempData);
                        tempChartData = userData;
                        console.log(tempChartData);
                        tempChartData.labels = tempData.map(function (data) { return data.year; });
                        tempChartData.datasets.data = tempData.map(function (data) { return data.MAM; });
                        tempChartData.datasets.backgroundColor = tempChartData.datasets[0].backgroundColor;
                        console.log(tempChartData);
                        return [4 /*yield*/, setUserData(tempChartData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (react_1["default"].createElement("form", { className: 'formYears', onSubmit: setyears },
        react_1["default"].createElement("label", { htmlFor: "min" }, "from year"),
        react_1["default"].createElement("input", { min: 1800, max: 2022, name: 'min', type: "number", required: true }),
        " ",
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("label", { htmlFor: "max" }, "til year"),
        react_1["default"].createElement("input", { min: 1800, max: 2022, name: 'max', type: "number", required: true }),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("input", { name: 'submit', type: "submit", value: "submit" })));
    // 0.07	0.15	0.11	0.19	0.11	0.12	0.01	0.05	0.04	0.08	-0.03	0.05
}
exports["default"] = Form;
