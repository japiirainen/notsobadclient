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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryFetch = exports.teFetch = exports.MaxRetriesError = void 0;
const ts_custom_error_1 = require("ts-custom-error");
const TE = __importStar(require("fp-ts/TaskEither"));
const O = __importStar(require("fp-ts/Option"));
const config_1 = require("./config");
const node_fetch_1 = __importDefault(require("node-fetch"));
const logger_1 = require("./logger");
class MaxRetriesError extends ts_custom_error_1.CustomError {
    constructor() {
        super(...arguments);
        this.status = 500;
        this.code = 'MaxRetriesError';
        this.log = true;
    }
}
exports.MaxRetriesError = MaxRetriesError;
const teFetch = (f) => TE.tryCatch(async () => {
    const baseUrl = config_1.config.apiBase;
    const json = await f(baseUrl);
    return O.fromNullable(json);
}, () => new MaxRetriesError());
exports.teFetch = teFetch;
const retryFetch = async (url, maxRetries) => {
    if (maxRetries === 0) {
        throw new MaxRetriesError();
    }
    try {
        const res = await node_fetch_1.default(url);
        const json = await res.json();
        const data = json.response ? json.response : json;
        if (!data || data.length === 0) {
            logger_1.logger.info('retrying', maxRetries);
            logger_1.logger.info(data.length);
            return exports.retryFetch(url, maxRetries - 1);
        }
        return data;
    }
    catch (e) {
        logger_1.logger.info('retry');
        return exports.retryFetch(url, maxRetries - 1);
    }
};
exports.retryFetch = retryFetch;
