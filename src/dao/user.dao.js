import pool from "../config/mysql.config.js";

export default class UserDao {

    getUsers = async() => {
        try {
            const [rows] = await pool.query("SELECT id, nombre, email, fecha_creacion, role FROM usuarios");
            return rows;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    };

    getUserById = async(id) => {
        try {
            const [rows] = await pool.query("SELECT id, nombre, email, fecha_creacion, role FROM usuarios WHERE id = ?", [id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    };
    
    getUserByEmail = async(email) => {
        try {
            const [rows] = await pool.query("SELECT id, nombre, email, fecha_creacion, role FROM usuarios WHERE email = ?", [email]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    };

    addUser = async(data) => {
        try {
            const { nombre, email, password } = data;
            const [result] = await pool.query("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)", [nombre, email, password]);
            return result.insertId;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    };

    updateUser = async(id, data) => {
        try {
            const { nombre, email } = data;
            const [result] = await pool.query("UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?", [nombre, email, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    };

    changePassword = async(id, password) => {
        try {
            const [result] = await pool.query("UPDATE usuarios SET password = ? WHERE id = ?", [password, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    };

    changeRole = async(id, role) => {
        try {
            const [result] = await pool.query("UPDATE usuarios SET role = ? WHERE id = ?", [role, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    };

    deleteUserById = async(id) => {
        try {
            const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    };

    truncateUsers = async () => {
        try {
            await pool.query("TRUNCATE TABLE usuarios");
            return true;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    };
    
};