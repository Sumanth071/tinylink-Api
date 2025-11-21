// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ---- DB CONNECT ----
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// ---- MIDDLEWARES ----
app.use(cors());
app.use(express.json()); // parses JSON body
app.use(express.urlencoded({ extended: false })); // parses form body
app.use(express.static(path.join(__dirname, "public"))); // serve CSS + JS

// ---- VIEW ENGINE ----
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---- HEALTH ----
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// ---- PAGES ----
app.get("/", (req, res) => res.render("index"));
app.get("/code/:code", (req, res) =>
  res.render("stats", { code: req.params.code })
);

// ---- API ROUTES ----
app.use("/api/links", require("./routes/api"));

// ---- REDIRECT (MUST BE LAST) ----
app.use("/", require("./routes/redirect"));

// ---- START SERVER ----
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
