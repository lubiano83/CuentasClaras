import { Router } from "express";
import UserController from "../controller/user.controller.js";
import passport from "passport";
import { Usuario, Premium, Developer } from "../middleware/auth.middleware.js";

const ROUTER = Router();
const userController = new UserController();
const permissions = passport.authenticate("current", { session: false });

ROUTER.get("/", permissions, Usuario, userController.getUsers);
ROUTER.delete("/", permissions, Developer, userController.deleteAllUser);
ROUTER.get("/id", permissions, Usuario, userController.getUserById);
ROUTER.put("/id", permissions, Usuario, userController.updateUserById);
ROUTER.delete("/id", permissions, Usuario, userController.deleteUserById);
ROUTER.get("/:email", permissions, Usuario, userController.getUserByEmail);

export default ROUTER;