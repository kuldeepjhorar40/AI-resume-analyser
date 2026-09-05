const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory = path.join(
  __dirname,
  "../Uploads"
);

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}


/**
 * Defines temporary disk storage for uploaded resumes while preserving
 * the original file extension and generating collision-resistant names.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});


/**
 * Restricts resume uploads to PDF documents before they enter the
 * document-processing pipeline.
 */
const fileFilter = (req, file, cb) => {
  console.log("File:", file.originalname);
  console.log("MIME:", file.mimetype);

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  if (
    file.mimetype === "application/pdf" &&
    extension === ".pdf"
  ) {
    return cb(null, true);
  }

  return cb(
    new Error("Only PDF files are allowed"),
    false
  );
};


const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;