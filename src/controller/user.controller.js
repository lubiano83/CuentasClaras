import UserDao from "../dao/user.dao.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";

const userDao = new UserDao();

export default class UserController {

    getUsers = async(req, res) => {
        try {
            const users = await userDao.getUsers();
            return res.status(200).send({ message: "Todos los usuarios..", users });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

    getUserById = async(req, res) => {
        try {
            const { id } = req.user;
            if( isNaN(Number(id))) return res.status(400).send({ message: "El id debe ser tipo numero.." });
            const user = await userDao.getUserById( Number(id) );
            if(!user) return res.status(404).send({ message: "Usuario no encontrado.." });
            return res.status(200).send({ message: "Usuario obtenido por el id..", user });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

    getUserByEmail = async(req, res) => {
        try {
            const { email } = req.body;
            if(!email) return res.status(400).send({ message: "El campo email es requerido.." })
            const user = await userDao.getUserByEmail(email.toLowerCase());
            return res.status(200).send({ message: "Usuario obtenido por el email..", user });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

    updateUserById = async(req, res) => {
        try {
            const { id } = req.user;
            const data = req.body;
            const { nombre, email } = data;
            if(!nombre, !email) return res.status(400).send({ message: "Todos los campos son requeridos.." });
            const user = await userDao.getUserById(Number(id));
            if(!user) return res.status(404).send({ message: "Usuario no encontrado.." });
            const updatedUser = { nombre: nombre.toLowerCase(), email: email.toLowerCase() };
            await userDao.updateUser(Number(id), updatedUser);
            return res.status(200).send({ message: "Usuario modificado con exito..", updatedUser });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

    deleteUserById = async(req, res) => {
        try {
            const { id } = req.user;
            if(isNaN(Number(id))) return res.status(400).send({ message: "El id debe ser tipo numero.." });
            const user = await userDao.getUserById( Number(id) );
            if(!user) return res.status(404).send({ message: "Usuario no encontrado.." });
            await userDao.deleteUserById( Number(id) );
            return res.status(200).send({ message: "Usuario eliminado con exito.." });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

    deleteAllUser = async(req, res) => {
        try {
            await userDao.truncateUsers();
            const users = await userDao.getUsers();
            return res.status(200).send({ message: "Todos los usuarios eliminados..", users });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

};