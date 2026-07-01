import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaSearch,
  FaTasks,
  FaPlus,
  FaCalendarAlt,
} from "react-icons/fa";

export default function TaskList({
  tasks,
  onAddTask,
  onEdit,
  onDelete,
  onComplete,
}) {
  const priorityStyles = {
    High:
      "bg-red-100 text-red-700 border border-red-200",
    Medium:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",
    Low:
      "bg-green-100 text-green-700 border border-green-200",
  };

  const statusStyles = {
    Pending:
      "bg-orange-100 text-orange-700 border border-orange-200",
    Completed:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-7">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="flex items-center gap-3 text-3xl font-bold text-white">

              <FaTasks />

              Task Dashboard

            </h2>

            <p className="mt-2 text-blue-100">

              Organize, manage and track all your tasks.

            </p>

          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <div className="relative">

              <FaSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search task..."
                className="w-full rounded-xl bg-white py-3 pl-11 pr-4 outline-none ring-0 focus:ring-2 focus:ring-blue-300 sm:w-72"
              />

            </div>

            <button
              onClick={onAddTask}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-md transition hover:scale-105 hover:bg-blue-50"
            >

              <FaPlus />

              Add Task

            </button>

          </div>

        </div>

      </div>

      {/* Empty State */}

      {tasks.length === 0 ? (

        <div className="flex flex-col items-center py-24">

          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">

            <FaTasks
              size={40}
              className="text-blue-600"
            />

          </div>

          <h2 className="text-2xl font-bold text-slate-700">

            No Tasks Yet

          </h2>

          <p className="mt-2 text-slate-500">

            Click below to create your first task.

          </p>

          <button
            onClick={onAddTask}
            className="mt-8 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
          >

            <FaPlus className="mr-2 inline" />

            Add Task

          </button>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="px-6 py-4 text-left text-sm uppercase tracking-wider">

                  Title

                </th>

                <th className="px-6 py-4 text-left text-sm uppercase tracking-wider">

                  Description

                </th>

                <th className="px-6 py-4 text-center text-sm uppercase tracking-wider">

                  Priority

                </th>

                <th className="px-6 py-4 text-center text-sm uppercase tracking-wider">

                  Status

                </th>

                <th className="px-6 py-4 text-center text-sm uppercase tracking-wider">

                  Due Date

                </th>

                <th className="px-6 py-4 text-center text-sm uppercase tracking-wider">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {tasks.map((task) => (

                <tr
                  key={task._id}
                  className="border-b border-slate-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                >
                                  <td className="px-6 py-4">

                    <div className="font-semibold text-slate-800">
                      {task.title}
                    </div>

                  </td>

                  <td className="px-6 py-4 max-w-sm">

                    <p className="truncate text-sm text-slate-500">
                      {task.description}
                    </p>

                  </td>

                  <td className="px-6 py-4 text-center">

                    <span
                      className={`inline-flex rounded-full px-4 py-1.5 text-xs font-semibold ${
                        priorityStyles[task.priority]
                      }`}
                    >
                      {task.priority}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-center">

                    <span
                      className={`inline-flex rounded-full px-4 py-1.5 text-xs font-semibold ${
                        statusStyles[task.status]
                      }`}
                    >
                      {task.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-center">

                    <div className="flex items-center justify-center gap-2 text-slate-600">

                      <FaCalendarAlt className="text-blue-600" />

                      {new Date(task.dueDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}

                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => onEdit?.(task)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition hover:scale-110 hover:bg-blue-600 hover:text-white"
                        title="Edit Task"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => onComplete?.(task)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 transition hover:scale-110 hover:bg-green-600 hover:text-white"
                        title="Mark Complete"
                      >
                        <FaCheckCircle />
                      </button>

                      <button
                        onClick={() => onDelete?.(task._id)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:scale-110 hover:bg-red-600 hover:text-white"
                        title="Delete Task"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      <div className="flex flex-col gap-2 border-t bg-slate-50 px-6 py-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">

        

        

      </div>

    </div>
  );
}