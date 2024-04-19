import mongoose from "mongoose";
import { fieldCannotBeEmpty } from "../../utils/schemaUtils/userSchemaMessage";

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
  completed: {
    type: Boolean,
    default: false,
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

const Batch = mongoose.model("Batch", batchSchema);

export default Batch;
