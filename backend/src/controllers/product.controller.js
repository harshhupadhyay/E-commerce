import productModel from "../models/product.model.js";
import { uploadImage } from "../services/imagekit.service.js";

export const createProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      sizes
    } = req.body;

    console.log(req.body);

    const existingProduct = await productModel.findOne({ name });

    if (existingProduct) {
      return res.status(409).json({
        message: "Product already exists"
      });
    }

    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        message: "At least one product image is required"
      });
    }

    // Optimized way to upload images

    const uploadPromises = files.map((file) => uploadImage(file));
    const uploadResults = await Promise.all(uploadPromises); //Wait until every upload is finished.
    const imageUrls = uploadResults.map((result) => result.url);

    const product = await productModel.create({
      name,
      description,
      price,
      stock,
      category,
      sizes,
      images: imageUrls,
      createdBy: req.user.userId
    });

    return res.status(201).json({
      message: "Product created successfully",
      data: product
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to create product"
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { search, category, sort } = req.query;

    const query = {};

    // 1. Search by name, category, or description (case-insensitive)
    if (search && search.trim() !== "") {
      const searchRegex = { $regex: search.trim(), $options: "i" };
      query.$or = [
        { name: searchRegex },
        { category: searchRegex },
        { description: searchRegex }
      ];
    }

    // 2. Filter by category (supports exact category, gender tabs, or partial keywords)
    if (category && category !== "All") {
      const cleanCat = category.trim();
      if (cleanCat.toLowerCase() === "men") {
        query.category = { $regex: "^Men's", $options: "i" };
      } else if (cleanCat.toLowerCase() === "women") {
        query.category = { $regex: "^Women's", $options: "i" };
      } else {
        const escaped = cleanCat.replace(/[.*+?^${}()|[\]\\]/g, (m) => "\\" + m);
        if (/^(men's|women's)/i.test(cleanCat)) {
          // Exact anchor match so "Men's Jeans" doesn't match "Women's Jeans"
          query.category = { $regex: `^${escaped}$`, $options: "i" };
        } else {
          // Partial keyword match (e.g. "Jeans", "Shirts", "Dresses")
          query.category = { $regex: escaped, $options: "i" };
        }
      }
    }

    // 3. Sorting
    let sortOption = { createdAt: -1 }; // default newest first
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };

    const skip = (page - 1) * limit;

    const products = await productModel
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalProducts = await productModel.countDocuments(query);

    const totalPages = Math.ceil(totalProducts / limit);

    return res.status(200).json({
      message: "All products are fetched successfully",
      data: {
        products,
        pagination: {
          page,
          limit,
          totalProducts,
          totalPages
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong! Unable to fetch products"
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      data: product
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong! Unable to fetch product"
    });
  }
};

export const updateProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // Object that will contain only the fields we want to update
    const updateData = {};

    // Fields that are allowed to be updated
    const allowedFields = [
      "name",
      "description",
      "price",
      "stock",
      "category",
      "sizes"
    ];

    // Check each allowed field
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const files = req.files;


    if (files && files.length > 0) {

      const uploadPromises = files.map((file) => uploadImage(file));
      const uploadResults = await Promise.all(uploadPromises);
      const imageUrls = uploadResults.map((result) => result.url);
      updateData.images = imageUrls;

    }

    const updatedProduct = await productModel.findByIdAndUpdate(id,
      {
        $set: updateData
      },
      {
        returnDocument: "after"
      }
    )

    return res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct
    });



  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong! Unable to update product"
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await productModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      message: "Something went wrong! Unable to delete product"
    });
  }
};


export const getProductCategories = async (req, res) => {
  try {
    const categories = await productModel.distinct("category");
    categories.sort((a, b) => a.localeCompare(b));
    return res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong! Unable to fetch categories",
    });
  }
};
