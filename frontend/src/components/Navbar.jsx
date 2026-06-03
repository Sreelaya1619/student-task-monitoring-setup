// ============================================================
// NAVBAR COMPONENT
// A reusable navigation bar displayed at the top of every page.
// It uses React Router's <NavLink> which automatically adds an
// "active" style to the link matching the current URL.
// ============================================================

import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xl shadow-lg">
              🎯
            </div>

            <div>
              <h1 className="text-white font-bold text-lg">
                  LAYA STUDENT TASK MANAGER
              </h1>
              <p className="text-xs text-gray-300">
                Stay Organized
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink to="/" end className={linkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/tasks" className={linkClass}>
              Tasks
            </NavLink>

            <NavLink to="/add" className={linkClass}>
              + Add Task
            </NavLink>

            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300"
              title="Toggle Theme"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-3 flex flex-col gap-2 border-t border-gray-700">
            <NavLink
              to="/"
              end
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/tasks"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Tasks
            </NavLink>

            <NavLink
              to="/add"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              + Add Task
            </NavLink>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-800 text-white"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}