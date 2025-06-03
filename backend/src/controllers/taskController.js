import Task from "../models/taskModel.js";


const newTask = async (req, res) => {
  try {
    const { name, location, status, power_output, connector_type } = req.body;

    
    if (!name || !location || !status || !power_output || !connector_type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, location, status, power_output, connector_type",
      });
    }

    const newTasks = await Task.create({ name, location, status, power_output, connector_type });

    res.status(201).json({
      success: true,
      message: "Charger created successfully",
      task: newTasks,
    });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create charger",
    });
  }
};


const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({
      success: true,
      message: "Fetched all chargers successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chargers",
    });
  }
};


const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, status, power_output, connector_type } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Task ID is required" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Charger not found" });
    }

   
    if (name) task.name = name;
    if (location) task.location = location;
    if (status) task.status = status;
    if (power_output) task.power_output = power_output;
    if (connector_type) task.connector_type = connector_type;

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: "Charger updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update charger",
    });
  }
};


const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Task ID is required" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Charger not found" });
    }

    res.status(200).json({
      success: true,
      message: "Charger deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete charger",
    });
  }
};

export { newTask, getTask, updateTask, deleteTask };
