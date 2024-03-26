const User = require("../models/userModel");

async function up() {

  await User.create({
    name: 'admin',
    email: 'admin123@yopmail.com',
    password: 'admin@123',
    isAdmin: true
  });
}

async function down() {
  //
}

module.exports = { up, down };