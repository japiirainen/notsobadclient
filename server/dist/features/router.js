"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const E = __importStar(require("fp-ts/Either"));
const function_1 = require("fp-ts/function");
const error_1 = require("../infrastructure/error");
const service_1 = require("./service");
exports.router = {
    test(_, res) {
        service_1.getAllProductsFromCategory('beanies')().then(r => function_1.pipe(r, E.fold(error_1.processError(res), products => res.status(200).json({ products }))));
    },
    test2(_, res) {
        service_1.getAvailabilitiesFromMan('umpante')().then(r => function_1.pipe(r, E.fold(error_1.processError(res), av => res.status(200).json({ av }))));
    },
};