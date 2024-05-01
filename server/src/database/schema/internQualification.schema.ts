import mongoose from "mongoose";
import {fieldCannotBeEmpty} from "../../utils/schemaUtils/userSchemaMessage";

const internQualification = new mongoose.Schema({
    universityName: {
        type: String,
        required: [true, fieldCannotBeEmpty("universityName")],
        default: "Not Filled Yet"
    },
    graduationYear: {
        type: Number,
        required: [true, fieldCannotBeEmpty("graduationYear")],
        default: 0
    },
    graduationMonth: {
        type: Number,
        min: 1,
        max: 12,
        required: [true, fieldCannotBeEmpty("graduationMonth")],
        default: 0
    },
    skills: {
        type: String,
        required: [true, fieldCannotBeEmpty("skills")],
        default: "Unspecified"
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
