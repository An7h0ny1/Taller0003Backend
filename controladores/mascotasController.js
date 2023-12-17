import {mascotas} from "../modelos/mascotasModelo.js";

//Crear un recurso 
const crear = (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).json({ mensaje: "El nombre no puede estar vacío." });
    }

    const dataset = {
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        edad: req.body.edad

    };

    // Usar Sequelize para crear el recurso
    mascotas.create(dataset)
        .then((resultado) => {
            console.log("Registro creado correctamente:", resultado);
            return res.status(201).json({ mensaje: "Registro creado correctamente", resultado });
        })
        .catch((err) => {
            console.error("Error al crear el registro:", err);
            return res.status(500).json({ mensaje: "Error al crear el registro", error: err.message });
        });
};

const buscarId = (req, res) => {
    const mascotaId = req.params.id;

    mascotas.findByPk(mascotaId)
        .then((mascota) => {
            if (!mascota) {
                return res.status(404).json({ mensaje: "Mascota no encontrada" });
            }
            console.log("Mascota encontrada:", mascota);
            return res.status(200).json({ mensaje: "Mascota encontrada", mascota });
        })
        .catch((err) => {
            console.error("Error al buscar la mascota por id:", err);
            return res.status(500).json({ mensaje: `Error al buscar la mascota por id: ${err.message}` });
        });
};

const buscar = (req, res) => {
    
    mascotas.findAll()
        .then((mascotas) => {
            if (!mascotas) {
                return res.status(404).json({ mensaje: "Mascotas no encontradas" });
            }
            console.log("Mascotas encontradas:", mascotas);
            return res.status(200).json({ mensaje: "Mascotas encontradas", mascotas });
        })
        .catch((err) => {
            console.error("Error al buscar la mascota por id:", err);
            return res.status(500).json({ mensaje: `Error al buscar la mascota por id: ${err.message}` });
        });
};

const actualizar = (req, res) => {
    const mascotaId = req.params.id;
    const nuevosDatos = {
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        edad: req.body.edad
    };

    mascotas.findByPk(mascotaId)
        .then((mascota) => {
            if (!mascota) {
                return res.status(404).json({ mensaje: "Mascota no encontrada" });
            }

            // Actualizar los datos de la mascota
            return mascota.update(nuevosDatos);
        })
        .then((mascotaActualizada) => {
            console.log("Mascota actualizada:", mascotaActualizada);
            return res.status(200).json({ mensaje: "Mascota actualizada correctamente", mascotaActualizada });
        })
        .catch((err) => {
            console.error("Error al actualizar la mascota:", err);
            return res.status(500).json({ mensaje: `Error al actualizar la mascota: ${err.message}` });
        });
};


const eliminar = (req, res) => {
    const mascotaId = req.params.id;

    mascotas.findByPk(mascotaId)
        .then((mascota) => {
            if (!mascota) {
                return res.status(404).json({ mensaje: "Mascota no encontrada" });
            }

            // Eliminar la mascota
            return mascota.destroy();
        })
        .then(() => {
            console.log("Mascota eliminada correctamente");
            return res.status(200).json({ mensaje: "Mascota eliminada correctamente" });
        })
        .catch((err) => {
            console.error("Error al eliminar la mascota:", err);
            return res.status(500).json({ mensaje: `Error al eliminar la mascota: ${err.message}` });
        });
};

export { crear, buscarId, buscar, actualizar, eliminar};