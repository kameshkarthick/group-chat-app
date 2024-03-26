const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/UserController");
const { auth, isAdmin } = require("../middleware");

const router = express.Router();

router.route("/").get(auth, allUsers);
router.route("/").post(auth, isAdmin, registerUser);
router.post("/login", authUser);

module.exports = router;