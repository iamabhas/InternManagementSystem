import mongoose from "mongoose";
import { fieldCannotBeEmpty } from "../../utils/schemaUtils/userSchemaMessage";

const leaveApplicationSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, fieldCannotBeEmpty("subject")],
  },
  applicationBody: {
    type: String,
    required: [true, fieldCannotBeEmpty("applicationBody")],
  },
  sendDate: {
    type: Date,
    default: Date.now(),
  },
  leaveFromDate: {
    type: Date,
    required: [true, fieldCannotBeEmpty("endDate")],
  },
  leaveToDate: {
    type: Date,
    required: [true, fieldCannotBeEmpty("endDate")],
  },
  User: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const LeaveApplication = mongoose.model(
  "LeaveApplication",
  leaveApplicationSchema
);

export default LeaveApplication;
