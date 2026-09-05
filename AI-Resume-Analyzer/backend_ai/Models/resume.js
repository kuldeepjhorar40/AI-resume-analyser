const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    resume_name: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    job_desc: {
      type: String,
      required: true,
    },

    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ResumeModel = mongoose.model(
  "resume",
  ResumeSchema
);

module.exports = ResumeModel;