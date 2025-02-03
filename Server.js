import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

// Load environment variables
dotenv.config();

const app = express();

// Allow Cross-Origin Requests for React frontend running on localhost:5173
app.use(cors({ origin: "http://localhost:5173" }));


// Parse incoming requests as JSON
app.use(bodyParser.json());

// Connect to MySQL (ensure the correct environment variables are set)
const db = mysql.createConnection({
  host: process.env.DB_HOST, // This will be the correct host from Render's environment
  user: process.env.DB_USER, // Your MySQL username
  password: process.env.DB_PASSWORD, // Your MySQL password
  database: process.env.DB_NAME, // Your MySQL database name
  port: 3306 // 
});

// Check DB connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database");
});

// Handle form submissions
app.post("/submit-form", (req, res) => {
  const { name, email, message } = req.body;

  // Validate the incoming data
  if (!name || !email || !message) {
    console.log("Missing required fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  // Prepare SQL query
  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  
  // Insert data into MySQL database
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Failed to save data" });
    }
    console.log("Data inserted successfully:", result);
    res.json({ success: true, message: "Form submitted successfully!" });
  });
});

// Start the server on the specified port (default 5001)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
