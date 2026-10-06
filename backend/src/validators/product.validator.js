import { body, param, validationResult } from 'express-validator';

export const productValidator = [
  body("name")
    .exists().withMessage("Name is required").bail()
    .isString().withMessage("Name must be a string").bail()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage("Name must be between 3 and 100 characters long"),

  body("description")
    .exists().withMessage("Description is required").bail()
    .isString().withMessage("Description must be a string").bail()
    .trim()
    .isLength({ min: 10, max: 1000 }).withMessage("Description must be between 10 and 1000 characters long"),

  body("price")
    .exists().withMessage("Price is required").bail()
    .isFloat({ min: 0 }).withMessage("Price must be a number greater than or equal to 0")
    .toFloat(),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stock must be an integer greater than or equal to 0")
    .toInt(),

  body("category")
    .exists().withMessage("Category is required").bail()
    .isString().withMessage("Category must be a string").bail()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage("Category must be between 2 and 100 characters long"),

  body("sizes")
    .exists().withMessage("Sizes are required").bail()
    .customSanitizer((value) => {
      if (Array.isArray(value)) return value;
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) return parsed;
        } catch {
          // not valid JSON
        }
        if (value.includes(",")) {
          return value.split(",").map((s) => s.trim());
        }
        return [value.trim()];
      }
      return value;
    })
    .isArray({ min: 1 })
    .withMessage("Sizes must be a non-empty array of strings"),

  body("sizes.*")
    .isString().withMessage("Each size must be a string").bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("Invalid size. Allowed sizes are: XS, S, M, L, XL, XXL"),

  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: validationErrors.array()
      });
    }
    next();
  }
];

export const productIdValidator = [
  param("id")
    .exists().withMessage("product id is required in req params").bail()
    .isMongoId().withMessage("Product id must be a valid MongoDB ObjectId"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "invalid Data",
        errors: errors.array()
      });
    }
    next();
  }
];

export const updateProductValidator = [
  body().custom((value, { req }) => {
    const hasBodyFields = Object.keys(req.body || {}).length > 0;
    const hasFiles = req.files && req.files.length > 0;
    if (!hasBodyFields && !hasFiles) {
      throw new Error("At least one field or image is required to update");
    }
    return true;
  }),

  body("name")
    .optional()
    .isString().withMessage("Name must be a string").bail()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage("Name must be between 3 and 100 characters long"),

  body("description")
    .optional()
    .isString().withMessage("Description must be a string").bail()
    .trim()
    .isLength({ min: 10, max: 1000 }).withMessage("Description must be between 10 and 1000 characters long"),

  body("price")
    .optional()
    .isFloat({ min: 0 }).withMessage("Price must be a number greater than or equal to 0")
    .toFloat(),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stock must be an integer greater than or equal to 0")
    .toInt(),

  body("category")
    .optional()
    .isString().withMessage("Category must be a string").bail()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage("Category must be between 2 and 100 characters long"),

  body("sizes")
    .optional()
    .customSanitizer((value) => {
      if (Array.isArray(value)) return value;
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) return parsed;
        } catch {
          // not valid JSON
        }
        if (value.includes(",")) {
          return value.split(",").map((s) => s.trim());
        }
        return [value.trim()];
      }
      return value;
    })
    .isArray({ min: 1 }).withMessage("Sizes must be a non-empty array of strings"),

  body("sizes.*")
    .optional()
    .isString().withMessage("Each size must be a string").bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("Invalid size. Allowed sizes are: XS, S, M, L, XL, XXL"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid product data",
        errors: errors.array()
      });
    }

    next();
  }
];




