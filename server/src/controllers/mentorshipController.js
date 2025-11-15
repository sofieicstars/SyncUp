import pool from "../config/db.js";

// ✅ Fetch all mentors
export const getMentors = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, role FROM users WHERE role = 'mentor'"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching mentors:", err);
    res.status(500).json({ error: "Server error fetching mentors" });
  }
};

// ✅ Fetch all sessions (joins mentor & intern)
export const getSessions = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        s.id,
        s.topic,
        s.details,
        s.session_date,
        s.status,
        s.notes,
        m.name AS mentor,
        i.name AS intern
      FROM mentorship_sessions s
      JOIN users m ON s.mentor_id = m.id
      JOIN users i ON s.intern_id = i.id
      ORDER BY s.session_date DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).json({ error: "Server error fetching sessions" });
  }
};

// ✅ Create a new session
export const createSession = async (req, res) => {
  const { intern_id, mentor_id, topic, details, session_date } = req.body;

  if (!intern_id || !mentor_id || !topic || !session_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [result] = await pool.query(
      `
      INSERT INTO mentorship_sessions 
      (intern_id, mentor_id, topic, details, session_date, status)
      VALUES (?, ?, ?, ?, ?, 'pending')
      `,
      [intern_id, mentor_id, topic, details, session_date]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Session created successfully",
    });
  } catch (err) {
    console.error("Error creating session:", err);
    res.status(500).json({ error: "Server error creating session" });
  }
};

// ✅ Update session status (accept, complete, decline)
export const updateSessionStatus = async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status field is required" });
  }

  try {
    const [result] = await pool.query(
      `
      UPDATE mentorship_sessions
      SET status = ?, notes = IFNULL(?, notes)
      WHERE id = ?
      `,
      [status, notes, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ message: "Session status updated successfully" });
  } catch (err) {
    console.error("Error updating session:", err);
    res.status(500).json({ error: "Server error updating session" });
  }
};

// ✅ Delete or archive session
export const deleteSession = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      `DELETE FROM mentorship_sessions WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ message: "Session deleted successfully" });
  } catch (err) {
    console.error("Error deleting session:", err);
    res.status(500).json({ error: "Server error deleting session" });
  }
};
