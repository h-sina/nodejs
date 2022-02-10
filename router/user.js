const express = require("express");
const router = express.Router();

const user_handler = require("../router_handle/user");

const expressJoi = require("@escook/express-joi")
const { reg_login_schema } = require('../schema/user')

router.post("/login", expressJoi(reg_login_schema), user_handler.login);
router.post("/register", expressJoi(reg_login_schema), user_handler.register);

module.exports = router;
