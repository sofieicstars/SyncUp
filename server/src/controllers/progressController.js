// src/controllers/progressController.js
import pool from "../config/db.js";

// ✅ GET /api/progress_updates
export const getProgressUpdates = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id, 
        p.content, 
        u.name AS user_name, 
        u.role AS user_role,
        pr.title AS project_title, 
        p.created_at
      FROM progress_updates p
      JOIN users u ON p.user_id = u.id
      JOIN projects pr ON p.project_id = pr.id
      ORDER BY p.created_at DESC
      LIMIT 15
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching updates:", err);
    res.status(500).json({ error: "Server error while fetching updates" });
  }
};

// ✅ POST /api/progress_updates
export const createProgressUpdate = async (req, res) => {
  const { project_id, user_id, content } = req.body;

  if (!project_id || !user_id || !content)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    const [result] = await pool.query(
      `INSERT INTO progress_updates (project_id, user_id, content, created_at)
       VALUES (?, ?, ?, NOW())`,
      [project_id, user_id, content]
    );

    const [rows] = await pool.query(
      `
      SELECT 
        p.id,
        p.content,
        u.name AS user_name,
        u.role AS user_role,
        pr.title AS project_title,
        p.created_at
      FROM progress_updates p
      JOIN users u ON p.user_id = u.id
      JOIN projects pr ON p.project_id = pr.id
      WHERE p.id = ?
      `,
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Error creating progress update:", err);
    res.status(500).json({ error: "Server error while adding update" });
  }
};
