import mongoose from "mongoose";
import { fieldCannotBeEmpty } from "../../utils/schemaUtils/userSchemaMessage";
import { positionConstants } from "../../constants/roleConstants";
const { SOFTWARE_ENGINEER, SCRUM_MASTER } = positionConstants;
const mentorSchema = new mongoose.Schema({
  mentorName: {
    type: String,
    required: [true, fieldCannotBeEmpty("MentorName")],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, fieldCannotBeEmpty("email")],
  },
  expertise: {
    type: [String],
    required: [true, fieldCannotBeEmpty("expertise")],
  },
  role: {
    type: String,
    enum: [SOFTWARE_ENGINEER, SCRUM_MASTER],
  },
});

const Mentor = mongoose.model("mentor", mentorSchema);

export default Mentor;
