
const express = require("express");
const UserController = require("../Controllers/user");
const router = express.Router();

router.post("/" ,UserController.register);


module.exports = router;
