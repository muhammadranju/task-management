const mongoose = require("mongoose");
const slugify = require("slugify");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    lowercase: true,
  },
  slug: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

taskSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
