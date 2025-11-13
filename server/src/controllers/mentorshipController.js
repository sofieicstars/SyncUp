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
