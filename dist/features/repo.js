"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailabilities = exports.getCategory = void 0;
const fetch_1 = require("../infrastructure/fetch");
const getCategory = c => fetch_1.teFetch(baseUrl => fetch_1.retryFetch(`${baseUrl}/products/${c}`, 20));
exports.getCategory = getCategory;
const getAvailabilities = m => fetch_1.teFetch(baseUrl => fetch_1.retryFetch(`${baseUrl}/availability/${m}`, 20));
exports.getAvailabilities = getAvailabilities;
//# sourceMappingURL=repo.js.map