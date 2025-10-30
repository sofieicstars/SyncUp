import pool from "../config/db.js";

export const getAllProjects = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM projects");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
