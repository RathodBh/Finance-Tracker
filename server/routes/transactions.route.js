const express = require("express");
const router = express.Router();
const Transactions = require("../controllers/transactionsController");

router.get("/show", Transactions.show);

router.get("/show/:id", Transactions.showInfo);

module.exports = router;
