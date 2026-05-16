import express from "express";

const router = express.Router();

// Temporary route (we'll upgrade later)
router.get("/:symbol", (req, res) => {
  res.json({ message: "AI route working" });
});

export default router;