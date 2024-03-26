const asyncHandler = require("express-async-handler");
const Group = require("../models/groupModel");


//@description     Create New Group Chat
//@route           POST /api/group
//@access          Protected
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  let users = req.body.users;

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  //users.push(req.user);

  try {
    const groupChat = await Group.create({
      groupName: req.body.name,
      users: users,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Group.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Rename Group
// @route   PUT /api/group/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
  const { groupId, name } = req.body;

  const updatedGroup = await Group.findByIdAndUpdate(
    groupId,
    {
        groupName: name,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedGroup) {
    res.status(404);
    throw new Error("Group Not Found");
  } else {
    res.json(updatedGroup);
  }
});

// @desc    Remove user from Group
// @route   PUT /api/group/remove
// @access  Protected
const removeMembersFromGroup = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.body;

  // check if the requester is admin

  const removed = await Group.findByIdAndUpdate(
    groupId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Group Not Found");
  } else {
    res.json(removed);
  }
});

// @desc    Add user to Group / Leave
// @route   PUT /api/group/add
// @access  Protected
const addMembersToGroup = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.body;

  // check if the requester is admin

  const added = await Group.findByIdAndUpdate(
    groupId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Group Not Found");
  } else {
    res.json(added);
  }
});

module.exports = {
  createGroupChat,
  renameGroup,
  addMembersToGroup,
  removeMembersFromGroup,
};