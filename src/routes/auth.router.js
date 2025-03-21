import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import passport from "passport";
import { Usuario, Premium, Developer } from "../middleware/auth.middleware.js";

const ROUTER = Router();
const authController = new AuthController();
const permissions = passport.authenticate("current", { session: false });

ROUTER.post("/register", authController.registerUser);
ROUTER.post("/login", authController.loginUser);
ROUTER.delete("/logout", authController.logoutUser);
ROUTER.patch("/password", authController.changePasswordById);
ROUTER.patch("/role", authController.changeRoleById);

export default ROUTER;