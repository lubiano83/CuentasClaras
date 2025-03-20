import IncomeDao from "../dao/income.dao.js";

const incomeDao = new IncomeDao();

export default class IncomeController {

    getIncomes = async(req, res) => {
        try {
            const incomes = await incomeDao.getIncomes();
            return res.status(200).send({ message: "Todos los ingresos..", incomes });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

    getIncomeById = async(req, res) => {
        try {
            const { id } = req.params;
            const income = await incomeDao.getIncomeById(Number(id));
            if(!income) return res.status(404).send({ message: "Ingreso no encontrado.." });
            return res.status(200).send({ message: "Ingreso obtenido por el id..", income });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

    addIncome = async(req, res) => {
        try {
            const data = req.body;
            const { id } = req.user;
            const usuario_id = id;
            const { descripcion, monto, fecha } = data;
            if(!usuario_id || !descripcion || !monto || !fecha) return res.status(400).send({ message: "Todos los campos son requeridos.." });
            const modifiedData = { usuario_id: Number(id), descripcion: String(descripcion), monto: Number(monto), fecha: new Date(fecha) };
            if(isNaN(Number(usuario_id)) || isNaN(Number(monto))) return res.status(400).send({ message: "El campo usuario_id y monto, deben ser tipo numero.." });
            await incomeDao.createIncome(modifiedData);
            return res.status(200).send({ message: "Ingreso agregado con exito..", income: modifiedData });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

    deleteIncomeById = async(req, res) => {
        try {
            const { id } = req.params;
            const income = await incomeDao.getIncomeById(Number(id));
            if(!income) return res.status(404).send({ message: "Ingreso no encontrado.." });
            await incomeDao.deleteIncome(Number(id));
            return res.status(200).send({ message: "Ingreso eliminado con exito.." });
        } catch (error) {
            return res.status(500).send({ message: "Error interno del servidor.", error: `controller: ${error.message}` });
        }
    };

};