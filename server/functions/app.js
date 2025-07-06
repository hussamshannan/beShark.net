require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const serverless = require("serverless-http");

// Routes
const slidesRouter = require("./routers/Slides");
const previousWorks = require("./routers/previousWork");
const whyUsRouter = require("./routers/whuUs");
const aboutRouter = require("./routers/about");
const emailRouter = require("./routers/email");
const categoryRouter = require("./routers/category");

const app = express();
const router = express.Router();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(process.env.MONGOODB)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Register Routes
router.use("/category", categoryRouter);
router.use("/email", emailRouter);
router.use("/about", aboutRouter);
router.use("/why-us", whyUsRouter);
router.use("/previous-works", previousWorks);
router.use("/slides", slidesRouter);

app.use("/.netlify/functions/app", router);

module.exports.handler = serverless(app);
