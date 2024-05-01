import mongoose from "mongoose";
import {fieldCannotBeEmpty} from "../../utils/schemaUtils/userSchemaMessage";

const batchSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    startDate: {
        type: Date,
        default: Date.now(),
    },
    endDate: {
        type: Date,
        required: [true, fieldCannotBeEmpty("endDate")],
    },
    interns: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    mentor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
});

const Batch = mongoose.model("batch", batchSchema);

export default Batch;
