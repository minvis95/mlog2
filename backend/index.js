const http = require("http");
const app = require("./app");
const db = require("./models");

db.config();

http
  .createServer(async (req, res) => {
    app.config(req, res);
  })
  .listen(8082, () => {
    console.log("Server Running at localhost:8082");
  });