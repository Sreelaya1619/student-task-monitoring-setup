// ============================================================
// TASK TABLE COMPONENT (UPDATED WITH PRIORITY)
// ============================================================

export default function TaskTable({ tasks, onDelete, onComplete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-5xl mb-4">📭</p>
        <p className="text-lg">No tasks yet. Add your first task!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">

        {/* HEADER */}
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {["Title", "Description", "Priority", "Status", "Created", "Actions"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >

              {/* TITLE */}
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-xs">
                <span
                  className={
                    task.status === "completed"
                      ? "line-through text-gray-400"
                      : ""
                  }
                >
                  {task.title}
                </span>
              </td>

              {/* DESCRIPTION */}
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300 max-w-xs">
                <span className="line-clamp-2">
                  {task.description || "—"}
                </span>
              </td>

              {/* PRIORITY (NEW) */}
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {task.priority || "Medium"}
                </span>
              </td>

              {/* STATUS */}
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {task.status === "completed" ? "✅ Completed" : "⏳ Pending"}
                </span>
              </td>

              {/* CREATED DATE */}
              <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {new Date(task.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3">
                <div className="flex gap-2 flex-wrap">

                  <button
                    onClick={() => onEdit(task)}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 rounded-md transition-colors"
                  >
                    ✏️ Edit
                  </button>

                  {task.status !== "completed" && (
                    <button
                      onClick={() => onComplete(task.id)}
                      className="px-3 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 rounded-md transition-colors"
                    >
                      ✔ Complete
                    </button>
                  )}

                  <button
                    onClick={() => onDelete(task.id)}
                    className="px-3 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 rounded-md transition-colors"
                  >
                    🗑 Delete
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}