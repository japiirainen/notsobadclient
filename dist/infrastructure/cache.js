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
exports.getFromCache = exports.CacheLookupError = exports.handleCache = exports.cache = void 0;
const E = __importStar(require("fp-ts/Either"));
const TE = __importStar(require("fp-ts/TaskEither"));
const function_1 = require("fp-ts/function");
const service_1 = require("../features/service");
const ts_custom_error_1 = require("ts-custom-error");
/* eslint-disable prefer-const */
exports.cache = {
    categories: {
        beanies: {},
        facemasks: {},
        gloves: {},
    },
    availabilities: {},
};
const categoryCacheHandler = (category) => service_1.getAllProductsFromCategory(category)().then(r => function_1.pipe(r, E.fold(() => categoryCacheHandler(category), res => Promise.resolve(res))));
const availabilitiesForProductsCacheHandler = (beanies, facemasks, gloves) => service_1.availabilitiesForProducts(beanies, facemasks, gloves)().then(r => function_1.pipe(r, E.fold(() => availabilitiesForProductsCacheHandler(beanies, facemasks, gloves), res => Promise.resolve(res))));
const handleCache = async () => {
    const [beanies, facemasks, gloves] = await Promise.all([
        categoryCacheHandler('beanies'),
        categoryCacheHandler('facemasks'),
        categoryCacheHandler('gloves'),
    ]);
    exports.cache.categories = { beanies, facemasks, gloves };
    const availabilities = await availabilitiesForProductsCacheHandler(beanies, gloves, facemasks);
    exports.cache.availabilities = availabilities;
};
exports.handleCache = handleCache;
class CacheLookupError extends ts_custom_error_1.CustomError {
    constructor() {
        super(...arguments);
        this.status = 500;
        this.code = 'CacheLookupError';
        this.log = true;
    }
}
exports.CacheLookupError = CacheLookupError;
const getFromCache = (i) => {
    if (i === 'beanies' || i === 'facemasks' || i === 'gloves') {
        if (Object.entries(exports.cache.categories[i]).length !== 0) {
            return TE.of(exports.cache.categories[i]);
        }
        return TE.left(new CacheLookupError());
    }
    if (Object.entries(exports.cache.availabilities).length !== 0) {
        return TE.of(exports.cache.availabilities);
    }
    return TE.left(new CacheLookupError());
};
exports.getFromCache = getFromCache;