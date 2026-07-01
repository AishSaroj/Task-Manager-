import { FaTasks, FaPlus, FaBell, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function Navbar({ onAddTask, pendingCount = 0 }) {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-purple-100 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 backdrop-blur-md">

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5">

        {/* Logo */}
        <div className="flex cursor-pointer items-center gap-3">
          <div className="rounded-xl bg-white/20 p-2 text-white backdrop-blur-sm">
            <FaTasks size={20} />
          </div>

          <h1 className="text-lg font-bold text-white sm:text-xl">
            Task<span className="text-white/80">Tracker</span>
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">

          {/* NEW TASK BUTTON */}
          <button
            onClick={onAddTask}
            className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 sm:px-4"
          >
            <FaPlus size={12} />
            <span className="hidden sm:inline">New Task</span>
          </button>

          {/* Bell Notification */}
          <div className="relative">

            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative rounded-xl p-2 text-white/90 hover:text-white"
            >
              <FaBell size={18} />

              {/* Badge */}
              {pendingCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {showNotif && (
              <div className="absolute right-0 mt-3 w-64 rounded-xl border border-blue-100 bg-white p-4 shadow-lg">

                <h3 className="font-semibold text-slate-800">
                  Pending Tasks
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  You have <b>{pendingCount}</b> pending tasks
                </p>

              </div>
            )}

          </div>

          {/* Profile */}
          <button className="flex items-center gap-2 text-white">
            <FaUserCircle size={26} />
            <span className="hidden text-sm font-medium md:inline">
              Aish
            </span>
          </button>

        </div>

      </div>

    </nav>
  );
}