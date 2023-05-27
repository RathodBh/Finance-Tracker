
const express = require("express");
const router = require("../server/routes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use("/", router);

app.listen("3456", () => {
    console.log("listening on 3456");
});
