const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    postBody: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
    categories: {
      type: Array,
      required: false,
    },
    username: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema);