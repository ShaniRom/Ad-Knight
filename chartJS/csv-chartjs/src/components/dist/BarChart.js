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
var papaparse_1 = require("papaparse");
// import CSVDownloader from "./CSVDownloader";
var react_chartjs_2_1 = require("react-chartjs-2");
var chart_js_1 = require("chart.js");
require("../style/style.scss");
var Table_1 = require("./Table");
var Form_1 = require("./Form");
// import {colors} from "../features/colors"
chart_js_1.Chart.register.apply(chart_js_1.Chart, chart_js_1.registerables);
//----- checks if label is date and turns the timestamp into actual date and time
//   let timestamp = 1607110465663;
//   let date = new Date(timestamp);
//   console.log(
//     "Date: " +
//       date.getDate() +
//       "/" +
//       (date.getMonth() + 1) +
//       "/" +
//       date.getFullYear() +
//       " " +
//       date.getHours() +
//       ":" +
//       date.getMinutes() +
//       ":" +
//       date.getSeconds()
//   );
// console.log(date)
var BarChart = function (props) {
    var dataSaved = props.dataSaved, labels = props.labels, keysOfObj = props.keysOfObj;
    // console.log(dataSaved);
    var _a = react_1.useState(dataSaved), CSVdata = _a[0], setCSVdata = _a[1];
    var _b = react_1.useState([]), backgroundcolor = _b[0], setBackGroundColor = _b[1];
    var _c = react_1.useState(false), chartClicked = _c[0], setChartClicked = _c[1];
    var _d = react_1.useState([1800, 2022]), years = _d[0], setYears = _d[1];
    var _e = react_1.useState(false), choseYears = _e[0], setChoseYears = _e[1];
    var _f = react_1.useState(), chartData = _f[0], setChartData = _f[1];
    var _g = react_1.useState(""), chosenlabel = _g[0], setChosenLabel = _g[1];
    var chartRef = react_1.useRef(null);
    var _h = react_1.useState({
        labels: CSVdata.map(function (data) { return "" + data["Year"]; }),
        datasets: [{
                label: "Global Temperature Time Series,Annual , 1800 - present",
                data: CSVdata.map(function (data) { return "" + data.MAM; }),
                backgroundColor: backgroundcolor
            }
        ]
    }), userData = _h[0], setUserData = _h[1];
    // set colors by values
    react_1.useEffect(function () {
        dataSaved.map(function (obj) {
            var tempColor;
            var int = parseFloat(obj.MAM);
            if (int < 0 && int > -0.5) {
                tempColor = "rgba(186, 14, 39)";
            }
            else if (int < -0.5) {
                tempColor = "black";
            }
            else if (int > 0 && int < 0.5) {
                tempColor = "rgb(222, 135, 21)";
            }
            else if (int > 0.5) {
                tempColor = "rgba(138, 213, 72, 0.25)";
            }
            backgroundcolor.push(tempColor);
        });
        // setBackGroundColor(colors(dataSaved))
    }, []);
    function setLabel(ev) {
        return __awaiter(this, void 0, void 0, function () {
            var label, tempData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        label = ev.target.id;
                        return [4 /*yield*/, setChosenLabel(label)];
                    case 1:
                        _a.sent();
                        tempData = userData;
                        tempData.labels = dataSaved.map(function (data) { return "" + data[chosenlabel]; });
                        setUserData(tempData);
                        return [2 /*return*/];
                }
            });
        });
    }
    // get chart data for table 
    var getChart = function (ev) { return __awaiter(void 0, void 0, void 0, function () {
        var chosenChart, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chosenChart = react_chartjs_2_1.getElementAtEvent(chartRef.current, ev);
                    index = chosenChart[0].index;
                    // console.log(index);
                    return [4 /*yield*/, getChartData(index)];
                case 1:
                    // console.log(index);
                    _a.sent();
                    setChartClicked(true);
                    return [2 /*return*/];
            }
        });
    }); };
    function getChartData(index) {
        return __awaiter(this, void 0, void 0, function () {
            var chartData;
            return __generator(this, function (_a) {
                chartData = CSVdata[index];
                setChartData(chartData);
                console.log(chartData);
                return [2 /*return*/];
            });
        });
    }
    // ==============================================================  
    // useEffect(() => {}, [setLabel]);
    // function settLabel(ev: any) {
    //   const label = ev.target.id;
    //   setChosenLabel(label);
    //   console.log(label);
    //   const tempData = userData;
    // if (chosenlabel ===' "Date"') {
    //   // const timeStamp = tempData.labels.chosenlabel;
    //  let date = new Date(chosenlabel);
    //   console.log(
    //     "Date: " +
    //       date.getDate() +
    //       "/" +
    //       (date.getMonth() + 1) +
    //       "/" +
    //       date.getFullYear() +
    //       " " +
    //       date.getHours() +
    //       ":" +
    //       date.getMinutes() +
    //       ":" +
    //       date.getSeconds()
    //   );
    //   tempData.labels = dataSaved.map((data: any) => `${data[`${label}`]}`);
    // }else{
    //   tempData.labels = dataSaved.map((data: any) => `${data[`${label}`]}`);
    //   setUserData(tempData);
    // }
    function handleDownload(CSVdata) {
        console.log(userData.datasets[0].data);
        console.log(userData.labels);
        // console.log(dataSaved);
        var dataTemp = userData.labels.map(function (year, i) {
            return ({ mam: userData.datasets[0].data[i], Year: year });
        });
        console.log(dataTemp);
        var templist = dataTemp.map(function (obj, i) {
            return ({
                "Year": obj.Year,
                "MAM": obj.mam
            });
        });
        var csv = papaparse_1["default"].unparse(templist);
        var blob = new Blob([csv]);
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'CSVExportFile.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    function handleDownloadToImg() {
        // const imageLink=document.createElement('a');
        // const canvas = document.getElementById('chart') as HTMLCanvasElement
        // imageLink.href= canvas.toDataURL('image/png',1);
        // document.write('<img src="'+imageLink+'"/>')
        // console.log(imageLink.href)
        var link = document.createElement("a");
        link.download = "chart.png";
        link.href = chartRef.current.toBase64Image("image/png", 1);
        link.click();
        console.log(link);
        // const ctx:any = document.getElementById('chartImg')
        // ctx.getContext('2d');
        // ctx.fillStyle = 'rgb(255, 221, 0)';
        // ctx.fillRect(255, 221, 0);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "chart", id: 'chartImg' },
            React.createElement(react_chartjs_2_1.Bar, { style: { width: 500, height: 350 }, ref: chartRef, onClick: getChart, data: userData, options: {
                    maintainAspectRatio: false,
                    scales: { x: { beginAtZero: true }, y: { beginAtZero: true } }
                } })),
        React.createElement(Form_1["default"], { userData: userData, setUserData: setUserData, dataSaved: dataSaved }),
        React.createElement(Table_1["default"], { chartClicked: chartClicked, chartData: chartData, keysOfObj: keysOfObj }),
        React.createElement("button", { onClick: function (CSVdata) { return handleDownload(CSVdata); } }, "Download To CSV"),
        React.createElement("button", { onClick: handleDownloadToImg }, "Download To Image")));
};
exports["default"] = BarChart;
