"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// main.tsx
const react_1 = require("react");
const client_1 = require("react-dom/client");
require("./index.css");
const App_1 = __importDefault(require("./App"));
const react_2 = __importDefault(require("react"));
const rootElement = document.getElementById('root');
if (rootElement) {
    (0, client_1.createRoot)(rootElement).render(react_2.default.createElement(react_1.StrictMode, null,
        react_2.default.createElement(App_1.default, null)));
}
else {
    throw new Error("Root element not found");
}
