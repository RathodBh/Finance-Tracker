const express = require("express");

const router = express.Router();
const UserRoutes = require("./user.route");
const TransRoutes = require("./transactions.route");

router.get("/", (req, res) => {
    res.send("Success!");
});

router.use("/user", UserRoutes);
router.use("/transaction", TransRoutes);

module.exports = router;
