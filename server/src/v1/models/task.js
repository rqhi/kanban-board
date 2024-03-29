const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");

const taskSchema = new Schema(
  {
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    validTill: {
      type: Date,
      default: Date.now() + 12096e5,
    },
    priority: {
      type: String,
      enum: ["Low", "Middle", "High"],
      default: "Low",
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    position: {
      type: Number,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Task", taskSchema);
