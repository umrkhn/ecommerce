import { Router } from "express";
import { createCart, getCart, resetCart, addItem, editItem, removeItem } from "../controllers/cartController.js";
import { wrapAsync } from "../helpers/index.js";
import { authorizeUser } from "../middlewares/auth.js";
const router = Router();

router.get("/", authorizeUser, wrapAsync(getCart));
router.post("/", authorizeUser, wrapAsync(createCart));
router.delete("/:id", authorizeUser, wrapAsync(resetCart));

router.post("/:id/item", authorizeUser, wrapAsync(addItem));
router.patch("/:id/item/:itemId", authorizeUser, wrapAsync(editItem));
router.delete("/:id/item/:itemId", authorizeUser, wrapAsync(removeItem));

export default router;
