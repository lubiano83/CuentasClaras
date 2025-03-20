import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import incomeRouter from "./routes/income.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";


// Variables
dotenv.config();
const APP = express();
const PORT = 8080;
const HOST = "localhost";

// Middlewares
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(cookieParser());
APP.use(passport.initialize());
initializePassport();

// Rutas
APP.use("/api/user", userRouter);
APP.use("/api/auth", authRouter);
APP.use("/api/income", incomeRouter);

// Listening
APP.listen(PORT, () => console.log(`Escuchando en http://${HOST}:${PORT}`));