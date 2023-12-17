import {solicitantes} from "../modelos/solicitantesModelo.js";

//Crear un recurso 
const crear = (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).json({ mensaje: "El nombre no puede estar vacío." });
    }

    const dataset = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        direccion: req.body.direccion
    };

    // Usar Sequelize para crear el recurso
    solicitantes.create(dataset)
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
    const personaId = req.params.id;

    solicitantes.findByPk(personaId)
        .then((persona) => {
            if (!persona) {
                return res.status(404).json({ mensaje: "Persona no encontrada" });
            }
            console.log("Persona encontrada:", persona);
            return res.status(200).json({ mensaje: "Persona encontrada", persona });
        })
        .catch((err) => {
            console.error("Error al buscar a la persona por id:", err);
            return res.status(500).json({ mensaje: `Error al buscar a la persona por id: ${err.message}` });
        });
};

const buscar = (req, res) => {
    
    solicitantes.findAll()
        .then((persona) => {
            if (!persona) {
                return res.status(404).json({ mensaje: "Persona no encontrada" });
            }
            console.log("Persona encontrada:", persona);
            return res.status(200).json({ mensaje: "Persona encontrada", persona });
        })
        .catch((err) => {
            console.error("Error al buscar a la persona por id:", err);
            return res.status(500).json({ mensaje: `Error al buscar a la persona por id: ${err.message}` });
        });
};

const actualizar = (req, res) => {
    const personaId = req.params.id;
    const nuevosDatos = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        direccion: req.body.direccion
    };

    solicitantes.findByPk(personaId)
        .then((persona) => {
            if (!persona) {
                return res.status(404).json({ mensaje: "Persona no encontrada" });
            }

            // Actualizar los datos de la persona
            return persona.update(nuevosDatos);
        })
        .then((personaActualizada) => {
            console.log("Persona actualizada:", personaActualizada);
            return res.status(200).json({ mensaje: "Persona actualizada correctamente", personaActualizada });
        })
        .catch((err) => {
            console.error("Error al actualizar a la persona:", err);
            return res.status(500).json({ mensaje: `Error al actualizar a la persona: ${err.message}` });
        });
};


const eliminar = (req, res) => {
    const personaId = req.params.id;

    solicitantes.findByPk(personaId)
        .then((persona) => {
            if (!persona) {
                return res.status(404).json({ mensaje: "Persona no encontrada" });
            }

            // Eliminar a la persona
            return persona.destroy();
        })
        .then(() => {
            console.log("Persona eliminada correctamente");
            return res.status(200).json({ mensaje: "persona eliminada correctamente" });
        })
        .catch((err) => {
            console.error("Error al eliminar a la persona:", err);
            return res.status(500).json({ mensaje: `Error al eliminar a la persona: ${err.message}` });
        });
};

export { crear, buscarId, buscar, actualizar, eliminar};