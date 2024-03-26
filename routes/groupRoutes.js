const express = require("express");
const {
    createGroupChat,
    renameGroup,
    addMembersToGroup,
    removeMembersFromGroup,
} = require("../controllers/GroupController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(auth, createGroupChat);
router.route("/rename").put(auth, renameGroup);
router.route("/remove").put(auth, removeMembersFromGroup);
router.route("/add").put(auth, addMembersToGroup);

module.exports = router;