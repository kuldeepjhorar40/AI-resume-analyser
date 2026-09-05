require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const connectDB = require("./conn.js");

const UserRoutes = require("./Routes/user");
const ResumeRoutes = require("./Routes/resume");

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/user", UserRoutes);
app.use("/api/resume", ResumeRoutes);


/**
 * Handles middleware-level application errors that are not handled
 * directly by controllers. Upload-related failures are converted into
 * consistent API responses before reaching the generic server handler.
 */
app.use((err, req, res, next) => {
  console.error("Application Error:", err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        error: "Upload error",
        message: "Resume PDF must not exceed 5 MB",
      });
    }

    return res.status(400).json({
      error: "Upload error",
      message: err.message,
    });
  }

  if (err.message === "Only PDF files are allowed") {
    return res.status(400).json({
      error: "Upload error",
      message: err.message,
    });
  }

  return res.status(500).json({
    error: "Server error",
    message: err.message || "Something went wrong",
  });
});


/**
 * Initializes required infrastructure before exposing the HTTP server.
 * The application only starts accepting requests after MongoDB has been
 * connected successfully.
 */
const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`App is listening on port: ${port}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err.message);
    process.exit(1);
  }
};

startServer();