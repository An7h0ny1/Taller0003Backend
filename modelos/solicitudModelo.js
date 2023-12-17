import Sequelize from "sequelize";
import { db } from "../database/conexion.js";
import { mascotas } from "./mascotasModelo.js"
import { solicitantes } from "./solicitantesModelo.js"
 
const solicitud = db.define('solicitudes', {
    mascota_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    solicitante_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    fecha_solicitud: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    estado: {
      type: Sequelize.ENUM('Pendiente', 'Aprobada', 'Rechazada'),
      defaultValue: 'Pendiente',
    },
  });

// Asociaciones
solicitud.belongsTo(mascotas, { foreignKey: 'mascota_id' });
solicitud.belongsTo(solicitantes, { foreignKey: 'solicitante_id' });

export { solicitud };