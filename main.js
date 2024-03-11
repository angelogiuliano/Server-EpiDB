const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const port = 3030;

const app = express();

// routes import
const usersRoute = require("./routes/users");

// middleware
app.use(express.json());

app.use("/", usersRoute);

// connessione database
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Db connection error!"));
db.once("open", () => {
  console.log("Database connected");
});

app.listen(port, () => {
  console.log("Server connected and listening on port " + port);
});
