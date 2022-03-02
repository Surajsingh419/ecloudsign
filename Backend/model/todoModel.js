const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title required"],
      trim: true,
    },

    Description: {
      type: String,
    },

    Status: {
      type: String,
      enum: ["Open", "In-Progress", "Completed"],
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
