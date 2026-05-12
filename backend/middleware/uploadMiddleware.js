const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");


const storage = new CloudinaryStorage({

  cloudinary,

  params: async (req, file) => {

    const isPDF =
      file.mimetype === "application/pdf";

    return {

      folder: "recruitment_portal",

      resource_type: isPDF ? "raw" : "image",

      type: "upload",

      access_mode: "public",

      public_id:
        `${Date.now()}-${file.originalname}`

    };

  }

});

const upload = multer({ storage });

module.exports = upload;