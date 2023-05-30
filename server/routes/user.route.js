const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

//used
router.post("/add", UserController.addUser);

router.get("/show", UserController.show);
router.get("/showAll", UserController.showAll);
router.get("/show/:id", UserController.showUser);
router.post("/addAll", UserController.addAll);
router.patch("/edit/:id", UserController.patchUser);
router.patch("/editAll/:id", UserController.patchAll);

module.exports = router;
