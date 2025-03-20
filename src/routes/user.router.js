import { Router } from "express";
import UserController from "../controller/user.controller.js";
import passport from "passport";
import { Usuario, Premium, Developer } from "../middleware/auth.middleware.js";

const ROUTER = Router();
const userController = new UserController();
const permissions = passport.authenticate("current", { session: false });

ROUTER.get("/", permissions, Usuario, userController.getUsers);
ROUTER.put("/", permissions, Usuario, userController.updateUserById);
ROUTER.delete("/", permissions, Usuario, userController.deleteUserById);
ROUTER.get("/id", permissions, Usuario, userController.getUserById);
ROUTER.delete("/all", permissions, Usuario, userController.deleteAllUser);

export default ROUTER;