import UserDao from "../dao/user.dao.js";

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
};