import mongoose from "mongoose";
import { fieldCannotBeEmpty } from "../../utils/schemaUtils/userSchemaMessage";
import { roleConstants } from "../../constants/roleConstants";
import { positionConstants } from "../../constants/roleConstants";

const { SOFTWARE_ENGINEER, SCRUM_MASTER, QUALITY_ASSURANCE } =
  positionConstants;
const { ADMIN, SUPER_ADMIN, MENTOR, USER } = roleConstants;

export interface IUser {
  _id: string;
  username: string;
  role: string;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, fieldCannotBeEmpty("username")],
      unique: true,
    },
    fullname: {
      type: String,
      trim: true,
      required: [true, fieldCannotBeEmpty("fullname")],
    },
    email: {
      type: String,
      unique: true,
      required: [true, fieldCannotBeEmpty("email")],
    },
    phoneNo: {
      type: Number,
      unique: true,
      required: [true, fieldCannotBeEmpty("phoneNo")],
    },
    role: {
      type: String,
      enum: [USER, MENTOR, ADMIN, SUPER_ADMIN],
      default: USER,
      required: [true, fieldCannotBeEmpty("role")],
    },
    password: {
      type: String,
      min: 8,
      max: 50,
      required: [true, fieldCannotBeEmpty("password")],
    },
    expertise: {
      type: [String],
    },

    position: {
      type: String,
      enum: [SOFTWARE_ENGINEER, SCRUM_MASTER, QUALITY_ASSURANCE],
    },
    status: {
      type: Boolean,
      default: true,
    },
    Batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batch",
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

export default user;
