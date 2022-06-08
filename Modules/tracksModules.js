const mongoose = require("mongoose");

const tracksSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  lap: {
    type: Number,
  },
  time:{
    type: Number,
  },
  track: {
      type: String
  },
  id: {
    type: String
  },
  car: {
    type: String
  }
});

const tracksModel = mongoose.model(
  "tracks",
  tracksSchema
);
module.exports = tracksModel;