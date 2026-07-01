import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // GET TASKS
  const getTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // OPEN ADD TASK
  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  // OPEN EDIT TASK
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // DELETE TASK
  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${id}`);
      getTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to delete task.");
    }
  };

  // TOGGLE COMPLETE / PENDING
  const handleCompleteTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        ...task,
        status:
          task.status === "Completed"
            ? "Pending"
            : "Completed",
      });

      getTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to update task.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* NAVBAR */}
      <Navbar
        onAddTask={handleAddTask}
        pendingCount={
          tasks.filter((t) => t.status === "Pending").length
        }
      />

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* STATS */}
        <StatsCards tasks={tasks} />

        {/* TASK LIST */}
        <div className="mt-8">

          <TaskList
            tasks={tasks}
            onAddTask={handleAddTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
          />

        </div>

      </div>

      {/* TASK FORM MODAL */}
      {showForm && (
        <TaskForm
          getTasks={getTasks}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          editingTask={editingTask}
        />
      )}

    </div>
  );
}