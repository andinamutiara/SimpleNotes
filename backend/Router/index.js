const express = require("express");
const notesRoutes = require("./notesRoutes");

const Router = express();
const api = "/api/v1";
Router.use(api, notesRoutes);

module.exports = Router;