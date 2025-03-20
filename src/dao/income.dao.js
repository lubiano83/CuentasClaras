import pool from "../config/mysql.config.js";

export default class IncomeDao {
    
    async getIncomes() {
        try {
            const [rows] = await pool.query("SELECT * FROM ingresos");
            return rows;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    }

    async getIncomeById(id) {
        try {
            const [rows] = await pool.query("SELECT * FROM ingresos WHERE id = ?", [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    }

    async getIncomeById(id) {
        try {
            const { usuario_id }  = id;
            const [rows] = await pool.query("SELECT * FROM ingresos WHERE usuario_id = ?", [usuario_id]);
            return rows;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    }

    async createIncome(data) {
        try {
            const { usuario_id, descripcion, monto, fecha } = data;
            const [result] = await pool.query("INSERT INTO ingresos (usuario_id, descripcion, monto, fecha) VALUES (?, ?, ?, ?)", [usuario_id, descripcion, monto, fecha]);
            return { id: result.insertId, usuario_id, descripcion, monto, fecha };
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    }

    async updateIncome(id, data) {
        try {
            const { descripcion, monto, fecha } = data;
            const [result] = await pool.query("UPDATE ingresos SET descripcion = ?, monto = ?, fecha = ? WHERE id = ?", [descripcion, monto, fecha, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    }

    async deleteIncome(id) {
        try {
            const [result] = await pool.query("DELETE FROM ingresos WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    }

    async deleteIngcomeByUserId(id) {
        try {
            const { usuario_id }  = id;
            const [result] = await pool.query("DELETE FROM ingresos WHERE usuario_id = ?", [usuario_id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`dao: ${error.message}`);
        }
    }
}