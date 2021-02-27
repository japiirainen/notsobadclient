"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = require("./features/router");
const createApp = async () => {
    const app = express_1.default();
    const v1Routes = express_1.default.Router();
    v1Routes.get('/test', router_1.router.test).get('/test2', router_1.router.test2).get('/test3', router_1.router.test3);
    // ? Auth
    app.use(morgan_1.default('dev'))
        .use(cors_1.default({
        credentials: true,
        origin: 'http://localhost:4000',
    }))
        .use(express_1.default.json())
        .use('/api', v1Routes);
    return app;
};
exports.createApp = createApp;
