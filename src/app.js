import express from "express";
import userRouter from "./routes/user.router.js";

// Variables
const APP = express();
const PORT = 8080;
const HOST = "localhost";

// Middlewares
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));

// Rutas
APP.use("/api/user", userRouter);

// Listening
APP.listen(PORT, () => console.log(`Escuchando en http://${HOST}:${PORT}`));