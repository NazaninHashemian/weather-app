"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// App.jsx
const Weather_1 = __importDefault(require("./components/Weather/Weather"));
require("./App.css");
const react_1 = __importDefault(require("react"));
function App() {
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement(Weather_1.default, null)));
}
exports.default = App;
