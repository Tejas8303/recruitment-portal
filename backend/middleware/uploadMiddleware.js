const multer = require("multer");
const path   = require("path");
const fs     = require("fs");

// Allowed MIME types — reject everything else
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const storage = multer.diskStorage({
  /**
   * Builds the upload path:
   *   uploads/<projectCode>/<applicantName_serialNumber>/
   *
   * req.resolvedProjectCode and req.resolvedSerialNumber are set by
   * the resolveProject pre-middleware before Multer runs.
   * req.body.applicantName is available because the frontend appends
   * text fields before file fields in the FormData.
   */
  destination: function (req, file, cb) {
    const projectCode   = req.resolvedProjectCode  || "unresolved";
    const applicantName = (req.body.applicantName  || "applicant").replace(/\s+/g, "_");
    const serial        = req.resolvedSerialNumber || 1;

    const folderName = `${applicantName}_${serial}`;
    const dest = path.join(__dirname, "../uploads", projectCode, folderName);

    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },

  /**
   * Filename pattern: ApplicantName_SerialNo_fieldname.ext
   * e.g. Rahul_Kumar_1_photo.jpg
   */
  filename: function (req, file, cb) {
    const applicantName = (req.body.applicantName || "applicant").replace(/\s+/g, "_");
    const serial        = req.resolvedSerialNumber || 1;
    const ext           = path.extname(file.originalname).toLowerCase();
    const name          = `${applicantName}_${serial}_${file.fieldname}${ext}`;
    cb(null, name);
  },
});

// Reject disallowed file types with a clear error
const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `File type "${file.mimetype}" is not allowed. ` +
        "Only PDF, JPG, JPEG and PNG files are accepted."
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = upload;