const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/MessageController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:groupId").get(auth, allMessages);
router.route("/").post(auth, sendMessage);

module.exports = router;