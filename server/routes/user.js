import { Router } from "express";
import { register, login, generateAccessToken, logout } from "../controllers/userController.js";
import { wrapAsync } from "../helpers/index.js";

const router = Router();

router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));
router.get("/token", wrapAsync(generateAccessToken));
router.get("/logout", wrapAsync(logout));

export default router;
