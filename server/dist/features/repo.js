"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailabilities = exports.getCategory = void 0;
const fetch_1 = require("../infrastructure/fetch");
const node_fetch_1 = __importDefault(require("node-fetch"));
const getCategory = c => fetch_1.teFetch(baseUrl => node_fetch_1.default(`${baseUrl}/products/${c}`));
exports.getCategory = getCategory;
const getAvailabilities = m => fetch_1.teFetch(baseUrl => node_fetch_1.default(`${baseUrl}/availability/${m}`));
exports.getAvailabilities = getAvailabilities;
// teFetch(baseUrl => fetch(`https://bad-api-assignment.reaktor.com/v2/availability/umpante`))
