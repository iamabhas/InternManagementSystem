import mongoose from "mongoose";
import { fieldCannotBeEmpty } from "../../utils/schemaUtils/userSchemaMessage";

const mentorSchema = new mongoose.Schema({
    mentorName:{
         type:String,
         required:[true, fieldCannotBeEmpty('MentorName')]
    },email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, fieldCannotBeEmpty("email")],
      },expertise:{
        type:String,
        required: [true, fieldCannotBeEmpty("expertise")],
      },role:{
        type:String,
        enum:['programmer','scrumMaster']
      }
})

const Mentor = mongoose.model('mentor', mentorSchema)

export default Mentor