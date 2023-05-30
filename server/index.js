
const express = require("express");
const router = require("../server/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
console.log(process.env.ORIGIN);
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors());

app.use(bodyParser.json({limit:'900kb'}));
app.use("/", router);


app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});
