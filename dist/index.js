"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./infrastructure/config");
const app_1 = require("./app");
const logger_1 = require("./infrastructure/logger");
const cache_1 = require("./infrastructure/cache");
app_1.createApp().then(app => app.listen(config_1.config.application.port, () => {
    cache_1.handleCache();
    setInterval(() => cache_1.handleCache(), 300000);
    logger_1.logger.info(`${config_1.config.application.name} is listening on ${config_1.config.application.port}`);
}));