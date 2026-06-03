// ============================================================
// TASK MODEL
// All database interactions live here.
// Uses the built-in node:sqlite module via the db instance.
//
// Prepared statements:
//   - Created once, executed many times (efficient)
//   - Parameters use ? placeholders to prevent SQL injection
// ============================================================

const db = require("../database/db");

const Task = {
  // -------------------------------------------------------
  // GET ALL TASKS
  // -------------------------------------------------------
  getAll() {
    return db.prepare("SELECT * FROM tasks ORDER BY createdAt DESC").all();
  },

  // -------------------------------------------------------
  // GET ONE TASK
  // -------------------------------------------------------
  getById(id) {
    return db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  },

  // -------------------------------------------------------
  // CREATE TASK
  // -------------------------------------------------------
  create({ title, description = "", priority = "Medium" }) {
    const result = db
      .prepare(
        "INSERT INTO tasks (title, description, priority) VALUES (?, ?, ?)"
      )
      .run(title, description, priority);

    return this.getById(result.lastInsertRowid);
  },

  // -------------------------------------------------------
  // UPDATE TASK
  // -------------------------------------------------------
  update(id, { title, description, priority }) {
    db.prepare(
      "UPDATE tasks SET title = ?, description = ?, priority = ? WHERE id = ?"
    ).run(title, description, priority, id);

    return this.getById(id);
  },

  // -------------------------------------------------------
  // MARK COMPLETE
  // -------------------------------------------------------
  complete(id) {
    db.prepare(
      "UPDATE tasks SET status = 'completed' WHERE id = ?"
    ).run(id);

    return this.getById(id);
  },

  // -------------------------------------------------------
  // DELETE TASK
  // -------------------------------------------------------
  delete(id) {
    const result = db
      .prepare("DELETE FROM tasks WHERE id = ?")
      .run(id);

    return result.changes;
  },

  // -------------------------------------------------------
  // DASHBOARD STATS
  // -------------------------------------------------------
  getStats() {
    const total = db
      .prepare("SELECT COUNT(*) AS count FROM tasks")
      .get().count;

    const completed = db
      .prepare(
        "SELECT COUNT(*) AS count FROM tasks WHERE status = 'completed'"
      )
      .get().count;

    const pending = db
      .prepare(
        "SELECT COUNT(*) AS count FROM tasks WHERE status = 'pending'"
      )
      .get().count;

    return {
      total,
      completed,
      pending,
    };
  },
};

module.exports = Task;