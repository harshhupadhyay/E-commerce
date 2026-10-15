import { Router } from "express";
import { createProducts, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";
import { authAdminMiddleWare, authMiddleWare } from "../middlewares/auth.middleware.js";
import { handleMulterError, upload } from "../middlewares/multer.middleware.js";
import { paginationValidator } from "../validators/pagination.validator.js";
import { productIdValidator, productValidator, updateProductValidator } from "../validators/product.validator.js";

const router = Router()

//create a new products
router.post('/', authMiddleWare, authAdminMiddleWare, upload.array('images', 5), handleMulterError, productValidator, createProducts)

// List all products

router.get('/', authMiddleWare, paginationValidator, getProducts)

//get Single product

router.get('/:id', authMiddleWare, productIdValidator, getProductById)

// Update a product
router.put('/:id', authMiddleWare, authAdminMiddleWare, productIdValidator, upload.array('images', 5), handleMulterError, updateProductValidator, updateProduct)

//Delete a product
router.delete('/:id', authMiddleWare, authAdminMiddleWare, productIdValidator, deleteProduct)



export default router
