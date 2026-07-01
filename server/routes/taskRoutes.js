const express = require("express");

const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleStatus,
} = require("../controllers/taskController");

router.get("/", getTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.patch("/:id/complete", toggleStatus);

module.exports = router;