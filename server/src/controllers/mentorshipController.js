import pool from "../config/db.js";

// GET all mentorship sessions
export const getAllSessions = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT ms.id, u1.name AS intern, u2.name AS mentor,
             ms.topic, ms.session_date, ms.status, ms.notes
      FROM mentorship_sessions ms
      JOIN users u1 ON ms.intern_id = u1.id
      JOIN users u2 ON ms.mentor_id = u2.id
      ORDER BY ms.session_date DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).json({ error: "Failed to fetch mentorship sessions" });
  }
};

// POST new mentorship session
export const createSession = async (req, res) => {
  const { intern_id, mentor_id, topic, details, session_date } = req.body;
  if (!intern_id || !mentor_id || !topic)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    const [result] = await pool.query(
      `INSERT INTO mentorship_sessions (intern_id, mentor_id, topic, details, session_date)
       VALUES (?, ?, ?, ?, ?)`,
      [intern_id, mentor_id, topic, details, session_date]
    );
    res
      .status(201)
      .json({ id: result.insertId, message: "Mentorship session created" });
  } catch (err) {
    console.error("Error creating session:", err);
    res.status(500).json({ error: "Failed to create mentorship session" });
  }
};

// GET sessions by user (intern or mentor)
export const getSessionsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT ms.*, u1.name AS intern, u2.name AS mentor
      FROM mentorship_sessions ms
      JOIN users u1 ON ms.intern_id = u1.id
      JOIN users u2 ON ms.mentor_id = u2.id
      WHERE ms.intern_id = ? OR ms.mentor_id = ?
      ORDER BY ms.session_date DESC
    `,
      [userId, userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching user sessions:", err);
    res.status(500).json({ error: "Failed to fetch user sessions" });
  }
};

// PUT update session status
export const updateSessionStatus = async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    const [result] = await pool.query(
      `UPDATE mentorship_sessions 
       SET status = ?, notes = ?
       WHERE id = ?`,
      [status, notes || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ message: "Session status updated successfully" });
  } catch (err) {
    console.error("Error updating session status:", err);
    res.status(500).json({ error: "Failed to update session status" });
  }
};
