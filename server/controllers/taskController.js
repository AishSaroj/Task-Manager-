const Task = require("../models/Task");

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Toggle Complete
exports.toggleStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    task.status =
      task.status === "Pending"
        ? "Completed"
        : "Pending";

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};