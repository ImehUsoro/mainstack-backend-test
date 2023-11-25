import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";
import authenticateToken from "../middleware/authenticateToken";
import { validateId } from "../middleware/userRouteValidators";
import cloudinary from "../config/cloudinaryConfig";
import Product from "../models/Product";
import { upload } from "../middleware/imageUploadMiddleWare";

const router = Router();

// router.post(
//   "/create-product",
//   authenticateToken,
//   upload.single("image"),
//   createProduct
// );

router.post("/create-product", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded");
      return;
    }
    const specifications = JSON.parse(req.body.specifications);

    const result = await cloudinary.uploader.upload(req.file.path);

    const product = new Product({
      ...req.body,
      specifications,
      image_url: result.secure_url,
    });

    await product.save();

    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/get-products", authenticateToken, getProducts);
router.get("/get-product/:id", authenticateToken, validateId);
router.get("search-product", authenticateToken);
router.patch("/update-product/:id", authenticateToken, validateId);
router.delete("/delete-product/:id", authenticateToken, validateId);

export default router;
