const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { environment } = require("./config");
const cors = require("cors");
const userRouter = require("./routes/users");
const taskRouter = require("./routes/tasks");
const projectRouter = require("./routes/projects");
const teamRouter = require("./routes/teams");
const tasklistRouter = require("./routes/tasklists");
const commentRouter = require("./routes/comments");
const server = express();
server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(cors({ origin: true }));

server.use(userRouter);
server.use("/task", taskRouter);
server.use("/project", projectRouter);
server.use("/team", teamRouter);
server.use("/tasklist", tasklistRouter);
server.user("/comment", commentRouter);

server.get("/", (req, res) => {
  res.send({ message: "You're Connected" });
});

// Catch unhandled requests such as wrong HTTP Method and forward to error handler.
server.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  err.errors = ["Could not find string of resource"];
  next(err);
});

// Generic error handler.
server.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = server;
