const express = require("express");
const ReviewCards = require("../models/ReviewCardModel.js");
const requireAuth = require("../middleware/requireAuth.js");

const {
  getReviews,
  addReview,
  deleteReview,
  getUserReviews,
} = require("../controllers/ReviewController.js");

const router = express.Router();

router.get("/", getReviews);

router.use(requireAuth);

router.post("/", addReview);

router.delete("/:id", deleteReview);

router.get("/user", getUserReviews);

module.exports = router;
