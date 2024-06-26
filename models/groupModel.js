const mongoose = require("mongoose");

const groupModel = mongoose.Schema(
  {
    groupName: { type: String, trim: true },
    // isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupModel);

module.exports = Group;