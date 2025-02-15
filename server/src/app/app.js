const express = require("express");
const app = express();
const middleware = require("../middleware/devMiddleware");
const routes = require("../router");
const globalController = require("../controllers/global.controller");

app.use([middleware, routes]);

app.use(globalController.notFoundHandler);
app.use(globalController.errorHandler);

module.exports = app;
