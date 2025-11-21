const express = require("express");
const router = express.Router();
const Link = require("../models/Link");

// URL CHECK
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// CREATE LINK
router.post("/", async (req, res) => {
  try {
    const { url, code } = req.body;

    if (!url) return res.status(400).json({ error: "URL required" });
    if (!code) return res.status(400).json({ error: "Code required" });

    if (!isValidUrl(url))
      return res.status(400).json({ error: "Invalid URL" });

    if (!/^[A-Za-z0-9]{6,8}$/.test(code))
      return res
        .status(400)
        .json({ error: "Code must be 6–8 alphanumeric" });

    const exists = await Link.findOne({ code });
    if (exists) return res.status(409).json({ error: "Code already exists" });

    const link = await Link.create({ url, code, clicks: 0 });
    res.status(201).json(link);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// LIST ALL
router.get("/", async (req, res) => {
  const links = await Link.find().sort({ createdAt: -1 });
  res.json(links);
});

// GET ONE
router.get("/:code", async (req, res) => {
  const link = await Link.findOne({ code: req.params.code });
  if (!link) return res.status(404).json({ error: "Not found" });
  res.json(link);
});

// DELETE
router.delete("/:code", async (req, res) => {
  const deleted = await Link.findOneAndDelete({ code: req.params.code });
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

module.exports = router;
