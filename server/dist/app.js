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
const cache_1 = require("./infrastructure/cache");
const createApp = async () => {
    const app = express_1.default();
    const v1Routes = express_1.default.Router();
    v1Routes
        .get('/test', (req, res) => res.json({ cache: cache_1.cache }))
        .get('/test2', (req, res) => res.json({ avs: cache_1.cache.availabilities }))
        .get('/category/:category', router_1.router.productCategory);
    // ? Auth
    app.use(morgan_1.default('dev'))
        .use(cors_1.default({
        credentials: true,
        origin: 'http://localhost:8081',
    }))
        .use(express_1.default.json())
        .use('/api', v1Routes);
    return app;
};
exports.createApp = createApp;
