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
exports.getProductsWithAvailability = exports.availabilitiesForProducts = exports.productstToManSet = exports.getAvailabilitiesFromMan = exports.getAllProductsFromCategory = void 0;
/* eslint-disable no-mixed-spaces-and-tabs */
const function_1 = require("fp-ts/function");
const TE = __importStar(require("fp-ts/TaskEither"));
const E = __importStar(require("fp-ts/Either"));
const S = __importStar(require("fp-ts/Set"));
const A = __importStar(require("fp-ts/Array"));
const ts_custom_error_1 = require("ts-custom-error");
const category_1 = require("../data/category");
const repo_1 = require("./repo");
const availability_1 = require("../data/availability");
class NoProductsError extends ts_custom_error_1.CustomError {
    constructor() {
        super(...arguments);
        this.status = 400;
        this.code = 'NoProductsError';
        this.log = true;
    }
}
class CategoryDecodeError extends ts_custom_error_1.CustomError {
    constructor() {
        super(...arguments);
        this.status = 400;
        this.code = 'CategoryDecodeError';
        this.log = true;
    }
}
class NoAvailabilitiesRawError extends ts_custom_error_1.CustomError {
    constructor() {
        super(...arguments);
        this.status = 400;
        this.code = 'NoAvailabilitiesRawError';
        this.log = true;
    }
}
class AvailabilityRawDecodeError extends ts_custom_error_1.CustomError {
    constructor() {
        super(...arguments);
        this.status = 400;
        this.code = 'AvailabilityRawDecodeError';
        this.log = true;
    }
}
const getAllProductsFromCategory = c => function_1.pipe(repo_1.getCategory(c), TE.chain(maybeUnknown => function_1.pipe(maybeUnknown, TE.fromOption(() => new NoProductsError()))), TE.chain(unknown => function_1.pipe(unknown, category_1.Category.decode, E.mapLeft(() => new CategoryDecodeError()), TE.fromEither)));
exports.getAllProductsFromCategory = getAllProductsFromCategory;
const getAvailabilitiesFromMan = m => function_1.pipe(repo_1.getAvailabilities(m), TE.chain(maybeUnknown => function_1.pipe(maybeUnknown, TE.fromOption(() => new NoAvailabilitiesRawError()))), TE.chain(unknown => function_1.pipe(unknown, availability_1.AvailabilityRaw.decode, E.mapLeft(() => new AvailabilityRawDecodeError()), TE.fromEither)));
exports.getAvailabilitiesFromMan = getAvailabilitiesFromMan;
const eqManufacturer = {
    equals: (x, y) => x === y,
};
const productstToManSet = (ps) => function_1.pipe(ps, A.map(({ manufacturer }) => manufacturer), S.fromArray(eqManufacturer));
exports.productstToManSet = productstToManSet;
const availabilitiesForProducts = (products) => {
    const noDubs = [...exports.productstToManSet(products)];
    const tasks = noDubs.map(exports.getAvailabilitiesFromMan);
    return function_1.pipe(A.array.sequence(TE.taskEither)(tasks), TE.map(avs => avs.flat()));
};
exports.availabilitiesForProducts = availabilitiesForProducts;
const getProductsWithAvailability = (category) => function_1.pipe(TE.bindTo('ps')(exports.getAllProductsFromCategory(category)), TE.bind('as', ({ ps }) => exports.availabilitiesForProducts(ps)), TE.bind('categoryWithAvailabilities', ({ as, ps }) => {
    const asMap = availaBilitiesToMap(as);
    const psWithAvailability = ps.map(p => {
        const avFowP = asMap.get(p.id);
        return avFowP ? { ...p, availability: avFowP } : { ...p, availability: 'not found' };
    });
    return TE.of(psWithAvailability);
}), TE.map(({ ps, as, categoryWithAvailabilities }) => ({ ps, as, categoryWithAvailabilities })));
exports.getProductsWithAvailability = getProductsWithAvailability;
const availaBilitiesToMap = (as) => {
    const asMap = new Map();
    as.forEach(a => asMap.set(a.id, a.DATAPAYLOAD));
    return asMap;
};
