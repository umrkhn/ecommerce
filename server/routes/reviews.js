import { Router } from "express";
import { createReview, getReviews } from "../controllers/reviewsController.js";
import { wrapAsync } from "../helpers/index.js";
import { authorizeUser } from "../middlewares/auth.js";

const router = Router({ mergeParams: true });

router.get("/", wrapAsync(getReviews));
router.post("/", authorizeUser, wrapAsync(createReview));
export default router;
