// ============================================================
// TASK CONTROLLER
// Controllers handle the REQUEST → RESPONSE cycle.
// ============================================================

const { validationResult } = require("express-validator");
const Task = require("../models/task");

// Helper function
const sendError = (res, status, message) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

// -------------------------------------------------------
// GET ALL TASKS
// -------------------------------------------------------
exports.getAllTasks = (req, res) => {
  try {
    const tasks = Task.getAll();

    res.json({
      success: true,
      data: tasks,
    });
  } catch (err) {
    sendError(res, 500, "Failed to fetch tasks.");
  }
};

// -------------------------------------------------------
// GET TASK BY ID
// -------------------------------------------------------
exports.getTaskById = (req, res) => {
  try {
    const task = Task.getById(req.params.id);

    if (!task) {
      return sendError(res, 404, "Task not found.");
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (err) {
    sendError(res, 500, "Failed to fetch task.");
  }
};

// -------------------------------------------------------
// CREATE TASK
// -------------------------------------------------------
exports.createTask = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const {
      title,
      description,
      priority,
    } = req.body;

    const task = Task.create({
      title,
      description,
      priority,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    sendError(res, 500, "Failed to create task.");
  }
};

// -------------------------------------------------------
// UPDATE TASK
// -------------------------------------------------------
exports.updateTask = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const existingTask = Task.getById(req.params.id);

    if (!existingTask) {
      return sendError(res, 404, "Task not found.");
    }

    const {
      title,
      description,
      priority,
    } = req.body;

    const updatedTask = Task.update(req.params.id, {
      title,
      description,
      priority,
    });

    res.json({
      success: true,
      data: updatedTask,
    });
  } catch (err) {
    sendError(res, 500, "Failed to update task.");
  }
};

// -------------------------------------------------------
// MARK TASK AS COMPLETED
// -------------------------------------------------------
exports.completeTask = (req, res) => {
  try {
    const existingTask = Task.getById(req.params.id);

    if (!existingTask) {
      return sendError(res, 404, "Task not found.");
    }

    const updatedTask = Task.complete(req.params.id);

    res.json({
      success: true,
      data: updatedTask,
    });
  } catch (err) {
    sendError(res, 500, "Failed to complete task.");
  }
};

// -------------------------------------------------------
// DELETE TASK
// -------------------------------------------------------
exports.deleteTask = (req, res) => {
  try {
    const deleted = Task.delete(req.params.id);

    if (!deleted) {
      return sendError(res, 404, "Task not found.");
    }

    res.json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (err) {
    sendError(res, 500, "Failed to delete task.");
  }
};

// -------------------------------------------------------
// TASK STATISTICS
// -------------------------------------------------------
exports.getStats = (req, res) => {
  try {
    const stats = Task.getStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (err) {
    sendError(res, 500, "Failed to fetch stats.");
  }
};