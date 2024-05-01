import mongoose from "mongoose";
import {fieldCannotBeEmpty} from "../../utils/schemaUtils/userSchemaMessage";

const internQualification = new mongoose.Schema({
    universityName: {
        type: String,
        required: [true, fieldCannotBeEmpty("universityName")],
    },
    graduationYear: {
        type: Number,
        min: 4,
        max: 4,
        required: [true, fieldCannotBeEmpty("graduationYear")],
    },
    graduationMonth: {
        type: Number,
        min: 1,
        max: 2,
        required: [true, fieldCannotBeEmpty("graduationMonth")],
    },
    skills: {
        type: String,
        required: [true, fieldCannotBeEmpty("skills")],
    },
    Intern: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    Batch: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "batch",
        },
    ],
});

const InternQualification = mongoose.model(
    "internQualification",
    internQualification
);

export default InternQualification;
