import { Router } from "express";
import IncomeController from "../controller/income.controller.js";
import passport from "passport";
import { Usuario, Premium, Developer } from "../middleware/auth.middleware.js";

const ROUTER = Router();
const incomeController = new IncomeController();
const permissions = passport.authenticate("current", { session: false });

ROUTER.get("/", permissions, Usuario, incomeController.getIncomes);
ROUTER.post("/", permissions, Usuario, incomeController.addIncome);
ROUTER.get("/:id", permissions, Usuario, incomeController.getIncomeById);
ROUTER.delete("/:id", permissions, Usuario, incomeController.deleteIncomeById);

export default ROUTER;