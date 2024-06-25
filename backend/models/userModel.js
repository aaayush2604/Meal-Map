const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//npm install bcrypt
const bcrypt = require("bcrypt");
//npm install validator
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
userSchema.statics.signUp = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Not Valid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong Enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in Use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email!");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid Password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
