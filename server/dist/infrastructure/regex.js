"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailabilityR = void 0;
const getAvailabilityR = s => 
//@ts-ignore
s.match(/INSTOCKVALUE>(\w*?)<\/INSTOCKVALUE/)[1] || 'not found';
exports.getAvailabilityR = getAvailabilityR;
