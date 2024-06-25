const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewCardSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  Rating: {
    type: Decimal128,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ReviewCard", ReviewCardSchema);
