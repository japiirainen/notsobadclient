"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryParamDecodeError = exports.AvailabilityRawDecodeError = exports.NoAvailabilitiesRawError = exports.CategoryDecodeError = exports.NoProductsError = void 0;
const ts_custom_error_1 = require("ts-custom-error");
class NoProductsError extends ts_custom_error_1.CustomError {
    constructor() {
        super(...arguments);
        this.status = 400;
        this.code = 'NoProductsError';
        this.log = true;
    }
}
exports.NoProductsError = NoProductsError;
class CategoryDecodeError extends ts_custom_error_1.CustomError {
    constructor() {
        super(...arguments);
        this.status = 400;
        this.code = 'CategoryDecodeError';
        this.log = true;
    }
}
exports.CategoryDecodeError = CategoryDecodeError;
class NoAvailabilitiesRawError extends ts_custom_error_1.CustomError {
    constructor() {
        super(...arguments);
        this.status = 400;
        this.code = 'NoAvailabilitiesRawError';
        this.log = true;
    }
}
exports.NoAvailabilitiesRawError = NoAvailabilitiesRawError;
class AvailabilityRawDecodeError extends ts_custom_error_1.CustomError {
    constructor() {
        super(...arguments);
        this.status = 400;
        this.code = 'AvailabilityRawDecodeError';
        this.log = true;
    }
}
exports.AvailabilityRawDecodeError = AvailabilityRawDecodeError;
class CategoryParamDecodeError extends ts_custom_error_1.CustomError {
    constructor() {
        super(...arguments);
        this.status = 400;
        this.code = 'CategoryParamDecodeError';
        this.log = true;
    }
}
exports.CategoryParamDecodeError = CategoryParamDecodeError;
//# sourceMappingURL=errors.js.map