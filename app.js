const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
require("dotenv/config");

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Import Routes
const postsRoutes = require("./routes/posts");

// Implement the routes
app.use("/posts", postsRoutes);

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION + process.env.DB_handler,
  { useNewUrlParser: true },
  () => console.log("connected to db")
);

// Settings
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
