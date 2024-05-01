import mongoose from "mongoose";

const internQualification = new mongoose.Schema({
  universityName: {
    type: String,
    default: "Not Filled Yet",
  },
  graduationYear: {
    type: Number,
    default: 0,
  },
  graduationMonth: {
    type: Number,
    min: 1,
    max: 12,
    default: 0,
  },
  skills: {
    type: String,
    default: "Unspecified",
  },
  Intern: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  Batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "batch",
  },
});

const InternQualification = mongoose.model(
  "internQualification",
  internQualification
);

export default InternQualification;
