import multer from "multer";

//setup multer as middleware It only receives and prepares the files.

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 5 * 1024 * 1024
  }
})

export const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_COUNT" || error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "You can upload a maximum of 5 images."
      });
    }

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Each image must be smaller than 5 MB."
      });
    }
  }

  next(error);
};
