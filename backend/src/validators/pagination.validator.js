import { query, validationResult } from "express-validator";

export const paginationValidator = [
  query("page")
    .default(1)
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt(),

  query("limit")
    .default(10)
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50")
    .toInt(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid query parameters",
        errors: errors.array()
      });
    }

    next();
  }
];
