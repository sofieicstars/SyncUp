import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
  res.send("SyncUp Backend API is running ");
});

// Database connection config
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // required for Azure
    trustServerCertificate: true,
  },
};

// Connect to Azure SQL
async function connectDB() {
  try {
    await sql.connect(dbConfig);
    console.log(" Connected to Azure SQL Database");
  } catch (err) {
    console.error(" Database connection failed:", err.message);
  }
}
// connectDB();
console.log(" no DB connection yet");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Hey Sofie, Server is on port ${PORT}`));
