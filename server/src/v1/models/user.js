const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["Administrator", "Projektmanager", "Teammitglied"],
      default: "Teammitglied",
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    }
  },
  schemaOptions
);

module.exports = mongoose.model("User", userSchema);
