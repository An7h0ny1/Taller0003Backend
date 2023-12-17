import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const solicitantes = db.define('solicitantes', {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    correo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    telefono: {
      type: Sequelize.STRING,
    },
    direccion: {
      type: Sequelize.TEXT,
    },
  });

export { solicitantes };