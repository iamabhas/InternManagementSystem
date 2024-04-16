import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "this field cannot be empty"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    phoneNo: {
      type: Number,
      unique: true,
      min: 9,
      max: 10,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "this field cannot be empty"],
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

export default user;
