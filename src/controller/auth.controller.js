import UserDao from "../dao/user.dao.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";

const userDao = new UserDao();

export default class AuthController {

    registerUser = async(req, res) => {
        try {
            const data = req.body;
            const { nombre, email, password } = data;
            if (!nombre || !email || !password) return res.status(400).json({ message: "Todos los campos son requeridos.." });
            const existingUser = await userDao.getUserByEmail(email.toLowerCase());
            if (existingUser) return res.status(409).json({ message: "Ese usuario ya está registrado.." });
            if (password.length < 6 || password.length > 10) return res.status(400).json({ message: "La contraseña debe tener entre 6 y 10 caracteres.." });
            const newUser = { nombre: nombre.toLowerCase(), email: email.toLowerCase(), password: await createHash(String(password)) };
            await userDao.addUser(newUser);
            return res.status(200).json({ message: "Usuario registrado exitosamente", newUser });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

    loginUser = async( req, res ) => {
        try {
            const data = req.body;
            const { email, password } = data;
            if( !email || !password ) return res.status( 400 ).send({ message: "Todos los campos son requeridos.." });
            const user = await userDao.getUserByEmail(email);
            if(!user) return res.status( 409 ).json({ message: "Ese usuario no esta registrado.." });
            const passwordMatch = await isValidPassword(user, String(password));
            if ( !passwordMatch ) return res.status( 401 ).json({ status: 401, message: "La contraseña es incorrecta.." });
            const userLogged = req.cookies[ process.env.COOKIE_NAME ];
            if ( userLogged ) return res.status( 200 ).send({ message: "Ese usuario ya está logeado" });
            const token = jwt.sign({ nombre: user.nombre.toLowerCase(), email: user.email, id: user.id }, process.env.COOKIE_KEY, { expiresIn: "1h" });
            res.cookie( process.env.COOKIE_NAME, token, { maxAge: 3600000, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "none", path: "/" });
            return res.status( 200 ).json({ message: "Login realizado con éxito", token });
        } catch ( error ) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

    logoutUser = async(req, res) => {
        try {
            const token = req.cookies[process.env.COOKIE_NAME];
            if (!token) return res.status(401).send({ message: "Token no encontrado, sesión cerrada.." });
            res.clearCookie(process.env.COOKIE_NAME, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "none", path: "/" });
            return res.status(200).json({ message: "Logout realizado con éxito.." });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };


    changePasswordById = async(req, res) => {
        try {
            const { id } = req.user;
            const { password } = req.body;
            if (String(password).length < 6 || String(password).length > 10) return res.status(400).json({ message: "La contraseña debe tener entre 6 y 10 caracteres.." });
            const user = await userDao.getUserById(Number(id));
            if(!user) return res.status(404).send({ message: "Usuario no encontrado" });
            await userDao.changePassword(id, password);
            return res.status(200).send({ message: "Contraseña actualizada correctamente.." });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

    changeRoleById = async(req, res) => {
        try {
            const { id } = req.user;
            const { role } = req.body;
            const user = await userDao.getUserById(Number(id));
            if(!user) return res.status(404).send({ message: "Usuario no encontrado" });
            const rolesPermitidos = ["usuario", "premium", "developer"];
            if (!rolesPermitidos.includes(role)) return res.status(400).send({ message: "Rol inválido. Los roles permitidos son: usuario, premium, developer." });
            await userDao.changeRole(id, role);
            return res.status(200).send({ message: "Role actualizado correctamente.." });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

};