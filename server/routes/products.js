import { Router } from "express";
import { getProducts, createProduct, showProduct } from "../controllers/productsController.js";
import { wrapAsync } from "../helpers/index.js";
import { authorizeUser } from "../middlewares/auth.js";

const router = Router();

router.get("/", wrapAsync(getProducts));
router.post("/", authorizeUser, wrapAsync(createProduct));
router.get("/:id", wrapAsync(showProduct));

export default router;
