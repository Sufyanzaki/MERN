const express = require("express");
const { socketConnect, sendMessage, allMessages } = require("../controller/socketController");

const router = express.Router();

router.route("/chat").get(socketConnect); //working

module.exports = router;