import mongoose from "mongoose";
import { fieldCannotBeEmpty } from "../../utils/schemaUtils/userSchemaMessage";
import { roleConstants } from "../../constants/roleConstants";

const { ADMIN, SUPER_ADMIN, USER } = roleConstants;

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
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, fieldCannotBeEmpty("email")],
    },
    phoneNo: {
      type: Number,
      unique: true,
      min: 9,
      max: 10,
      required: [true, fieldCannotBeEmpty("phoneNo")],
    },
    role: {
      type: String,
      enum: [USER, ADMIN, SUPER_ADMIN],
      default: USER,
      required: [true, fieldCannotBeEmpty("role")],
    },
    password: {
      type: String,
      min: 5,
      max: 50,
      required: [true, fieldCannotBeEmpty("password")],
    },
    expertise:{
      type:String,
    
    }
    
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

export default user;
