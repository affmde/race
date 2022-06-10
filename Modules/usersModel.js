const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name:{
      type: String
  },  
  username: {
    type: String,
  },
  password: {
      type: String
  },
  experience: {
    type: Number,
  },
  level:{
      type: Number
  },
  coins: {
      type: Number
  },
  races: {
      type: Array
  },
  email: {
    type: String
  },
  wins: {
    type: Number
  },
  driver:{
    type: String
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  garage:{
    type: Array
  },
  objectivesCompleted: {
    type: Array
  }
});

const usersModel = mongoose.model(
  "users",
  usersSchema
);
module.exports = usersModel;