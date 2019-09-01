const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const blogController = require("./controllers/blogs");
const userController = require("./controllers/users");
const loginController = require("./controllers/login");
const commentController = require("./controllers/comments");

const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

const url = process.env.MONGODB_URI;

logger.info("connecting to", config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));

app.use(middleware.tokenExtractor);
app.use("/api", blogController);
app.use("/api", userController);
app.use("/api", commentController);
app.use("/api/login", loginController);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);
module.exports = app;
