const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");

const boardSchema = new Schema(
  {
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: false,
    },
    icon: {
      type: String,
      default: "📃",
    },
    title: {
      type: String,
      default: "Untitled",
    },
    description: {
      type: String,
      default: `Füge hier eine Beschreibung hinzu
    🟢 Eine Beschreibung kann auch mehrzeilig sein
    🟢 Lass uns starten...`,
    },
    position: {
      type: Number,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    favouritePosition: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Board", boardSchema);
