import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], required: true },
  power_output: { type: Number, required: true },
  connector_type: { type: String, required: true },
});

const Task = mongoose.model("Task",taskSchema);

export default Task;


