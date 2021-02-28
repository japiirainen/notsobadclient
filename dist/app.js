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
const path_1 = __importDefault(require("path"));
const createApp = async () => {
    const app = express_1.default();
    const apiRoutes = express_1.default.Router();
    apiRoutes.get('/category/:category', router_1.router.productCategory);
    app.use(morgan_1.default('dev'))
        .use(cors_1.default({
        credentials: true,
        origin: 'http://localhost:8081',
    }))
        .use(express_1.default.json())
        .use('/api', apiRoutes)
        // ? serve react app
        // ? let the react app to handle any unknown routes
        // ? serve up the index.html if express does'nt recognize the route
        .use(express_1.default.static('clientbuild'))
        .get('*', (_, res) => {
        res.sendFile(path_1.default.resolve('clientbuild', 'index.html'));
    });
    return app;
};
exports.createApp = createApp;
