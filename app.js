const express = require('express');
const connnectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const messageRoutes = require("./routes/messageRoutes");
const runMigrations = require("./config/migration");

dotenv.config();

// connect to DB
connnectDB();

// run the migration
runMigrations();

const app = express();

app.use(express.json());

// app routes
app.use("/api/user", userRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/message", messageRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running..");
});


const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);