const express = require("express");
const ReviewCards = require("../models/ReviewCardModel.js");
const router = express.Router();

const getReviews = async (req, res) => {
  const reviewcards = await ReviewCards.find({});

  res.json(reviewcards);
};

const getUserReviews = async (req, res) => {
  const user_id = req.user._id;
  const userReviews = await ReviewCards.find({ user_id });
  res.status(200).json(userReviews);
};

const addReview = async (req, res) => {
  const { Name, City, Rating } = req.body;
  const user_id = req.user._id;
  const ReviewCard = await ReviewCards.create({ Name, City, Rating, user_id });
  res.json(ReviewCard);
};

const deleteReview = async (req, res) => {
  console.log("Hi");
  const { id } = req.params;
  console.log(id + "Hello");
  const review = await ReviewCards.findOneAndDelete({ _id: id });
  res.status(200).json(review);
};

module.exports = {
  getReviews,
  addReview,
  deleteReview,
  getUserReviews,
};
