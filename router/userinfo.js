const express = require('express')
const router = express.Router()

const userinfo_handler = require('../router_handle/userinfo')

router.get("/userinfo", userinfo_handler.getUserInfo);
router.get("/comment", userinfo_handler.getComment);
router.post("/addcomment", userinfo_handler.addComment);
module.exports = router