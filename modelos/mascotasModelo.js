import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const mascotas = db.define("mascotas", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    edad: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    estado_adopcion: {
        type: Sequelize.ENUM('Disponible', 'Adoptado'),
        defaultValue: 'Disponible'
    }
});

export { mascotas };
