import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStats, fetchTasks } from "../services/api";

// ⭐ Motivational Quotes
const quotes = [
  "Small progress is still progress 💪",
  "Stay consistent, success will follow 🚀",
  "Discipline is greater than motivation 🔥",
  "Do it now. Sometimes 'later' becomes 'never' ⏳",
  "Your future is created by what you do today 🌱",
  "Push yourself, no one else will do it for you ⚡",
  "Dream big. Start small. Act now 🎯"
];

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ⭐ new state for quote
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [statsRes, tasksRes] = await Promise.all([
          fetchStats(),
          fetchTasks(),
        ]);

        setStats(statsRes.data.data);
        setRecentTasks(tasksRes.data.data.slice(0, 5));

        // ⭐ pick random quote every refresh
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);

      } catch (err) {
        setError("Failed to load dashboard data. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
        {error}
      </div>
    );

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="space-y-8">

      {/* ⭐ HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          LAYA STUDENT TASK MANAGER
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome back! Here's your task overview.
        </p>

        {/* ⭐ MOTIVATIONAL QUOTE */}
        <div className="mt-4 p-4 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg text-sm font-medium">
          💡 {quote}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-purple-500">
          <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-2xl">
            📋
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Tasks
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-green-500">
          <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-2xl">
            ✅
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.completed}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Completed
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-yellow-500">
          <div className="w-14 h-14 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-2xl">
            ⏳
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.pending}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pending
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {stats.total > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Completion Progress
            </span>
            <span className="text-sm font-bold text-purple-600">
              {completionRate}%
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}

      {/* Recent Tasks */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Tasks
          </h2>

          <Link
            to="/tasks"
            className="text-sm text-purple-600 hover:underline dark:text-purple-400"
          >
            View all →
          </Link>
        </div>

        {recentTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No tasks yet.</p>
            <Link
              to="/add"
              className="text-purple-600 hover:underline dark:text-purple-400"
            >
              Add your first task →
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {recentTasks.map((task) => (
              <li key={task.id} className="py-3 flex items-center justify-between">
                <span
                  className={`font-medium ${
                    task.status === "completed"
                      ? "line-through text-gray-400"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {task.title}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 flex-wrap">
        <Link
          to="/add"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          + Add New Task
        </Link>

        <Link
          to="/tasks"
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          View All Tasks
        </Link>
      </div>
    </div>
  );
}