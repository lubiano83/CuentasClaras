import { Router } from "express";
import UserController from "../controller/user.controller.js";

const ROUTER = Router();
const userController = new UserController();

ROUTER.get("/", userController.getUsers);

export default ROUTER;