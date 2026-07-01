import { useEffect, useState } from "react";
import api from "../services/api";

export default function TaskForm({ getTasks, onClose, editingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  // ✅ FIX: populate form when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "Medium");
      setDueDate(
        editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : ""
      );
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingTask) {
        // UPDATE TASK
        await api.put(`/tasks/${editingTask._id}`, {
          title,
          description,
          priority,
          dueDate,
        });
      } else {
        // CREATE TASK
        await api.post("/tasks", {
          title,
          description,
          priority,
          dueDate,
        });
      }

      await getTasks();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* Header (UNCHANGED UI) */}
        <div className="flex items-center justify-between border-b px-8 py-5">
          <h2 className="text-2xl font-bold text-slate-800">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h2>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-slate-500 transition hover:bg-red-100 hover:text-red-600"
          >
            ✕
          </button>
        </div>

        {/* Form (UNCHANGED UI) */}
        <form onSubmit={handleSubmit} className="space-y-5 p-8">

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Task Title
            </label>

            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows="4"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Due Date
              </label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

          </div>

          {/* Buttons (UNCHANGED UI)  */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}