import {solicitud} from "../modelos/solicitudModelo.js";
import {mascotas} from "../modelos/mascotasModelo.js";
import {solicitantes} from "../modelos/solicitantesModelo.js";

// Crear una solicitud
const crear = async (req, res) => {
    const { mascota_id, solicitante_id } = req.body;
  
    try {
        // Validaciones
        if (!mascota_id || !solicitante_id) {
            return res.status(400).json({ mensaje: "Se requieren mascota_id y solicitante_id para crear una solicitud." });
        }
    
        const mascota = await mascotas.findByPk(mascota_id);
        const solicitante = await solicitantes.findByPk(solicitante_id);
    
        if (!mascota) {
            return res.status(400).json({ mensaje: "Mascota no encontrada." });
        }

        if (!solicitante) {
            return res.status(400).json({ mensaje: "Solicitante no encontrado." });
        }
    
        // Verificar si la mascota está disponible para adopción
        if (mascota.estado_adopcion !== 'Disponible') {
            return res.status(400).json({ mensaje: "La mascota no está disponible para adopción." });
        }
    
        // Crear la solicitud
        const nuevaSolicitud = await solicitud.create({
            mascota_id,
            solicitante_id,
            fecha_solicitud: new Date(),
            estado: 'Pendiente'
        });
    
        res.status(201).json({ 
            tipo: "success",
            mensaje: "Solicitud creada correctamente", solicitud: nuevaSolicitud });
    } catch (error) {
        console.error("Error al crear la solicitud:", error);
        res.status(500).json({ 
            tipo: "error",
            mensaje: "Error al crear la solicitud", error: error.message });
    }
};

const buscarId = (req, res) => {
    const solicitudId = req.params.id;

    solicitud.findByPk(solicitudId)
        .then((solicitud) => {
            if (!solicitud) {
                return res.status(404).json({ mensaje: "Solicitud no encontrada" });
            }
            console.log("Solicitud encontrada:", solicitud);
            return res.status(200).json({ mensaje: "Solicitud encontrada", solicitud });
        })
        .catch((err) => {
            console.error("Error al buscar la solicitud por id:", err);
            return res.status(500).json({ mensaje: `Error al buscar la solicitud por id: ${err.message}` });
        });
};

const buscar = (req, res) => {
    
    solicitud.findAll()
        .then((solicitud) => {
            if (!solicitud) {
                return res.status(404).json({ mensaje: "Solicitud no encontrada" });
            }
            console.log("Solicitud encontrada:", solicitud);
            return res.status(200).json({ mensaje: "Solicitud encontrada", solicitud });
        })
        .catch((err) => {
            console.error("Error al buscar la solicitud por id:", err);
            return res.status(500).json({ mensaje: `Error al buscar la solicitud por id: ${err.message}` });
        });
};

const actualizar = (req, res) => {
    const solicitudId = req.params.id;
    const nuevosDatos = {
      estado: req.body.estado, 
    };
  
    solicitud.findByPk(solicitudId, { include: [mascotas, solicitantes] })//el include: es para proporcionar informacion acerca de las tablas relacionadas solicitud
      .then((solicitud) => {
        if (!solicitud) {
          return res.status(404).json({ mensaje: "Solicitud no encontrada" });
        }
  
        // Actualizar los datos de la solicitud
        return solicitud.update(nuevosDatos);
      })
      .then((solicitudActualizada) => {
        res.status(200).json({ 
            tipo: "success",
            mensaje: "Solicitud actualizada correctamente", solicitud: solicitudActualizada });
      })
      .catch((error) => {
        console.error("Error al actualizar la solicitud:", error);
        res.status(500).json({ 
            tipo: "error",
            mensaje: `Error al actualizar la solicitud: ${error.message}` });
      });
};

const eliminar = (req, res) => {
    const solicitudId = req.params.id;

    solicitud.findByPk(solicitudId)
        .then((solicitud) => {
            if (!solicitud) {
                return res.status(404).json({ mensaje: "Solicitud no encontrada" });
            }

            // Eliminar la solicitud
            return solicitud.destroy();
        })
        .then(() => {
            console.log("Solicitud eliminada correctamente");
            return res.status(200).json({ 
                tipo: "success",
                mensaje: "Solicitud eliminada correctamente" });
        })
        .catch((err) => {
            console.error("Error al eliminar la solicitud:", err);
            return res.status(500).json({ 
                tipo: "error",
                mensaje: `Error al eliminar la solicitud: ${err.message}` });
        });
};
export { crear, buscarId, buscar, actualizar, eliminar };