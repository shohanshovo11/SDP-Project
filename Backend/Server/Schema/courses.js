const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema(
  {
    course_id: String,
    creator: String,
    videoAmount: Number,
    vidLink: String,
    profileImgUrl: String,
    description: String,
    tags: [String],
  },
  {
    collection: "courses",
  }
);

const coursesModel = mongoose.model("courses", coursesSchema);
module.exports = coursesModel;
