/**
 * 
 *
 * @module routes/authRoutes
 */

import express from 'express';
import Sequelize from 'sequelize';

// Configuración de conexión a la base de datos
const db = new Sequelize('adopcion', 'mascotas', 'mascotas2023', {
  host: 'localhost',
  dialect: 'mysql'
});

// Creación de un router de Express
const router = express.Router();

/**
 * 
 *
 * @function
 * @name POST /login
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Objeto JSON con un mensaje indicando el resultado del inicio de sesión.
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario en la base de datos por nombre de usuario
    const [user] = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', { replacements: [username], type: Sequelize.QueryTypes.SELECT });

    console.log('Usuario recuperado:', user);

    if (user) {
      console.log('Contraseña almacenada en la base de datos:', user.contrasena);

      // Comparar la contraseña proporcionada con la almacenada directamente
      const isMatch = password === user.contrasena;

      console.log('Resultado de la comparación detallada:', isMatch);

      if (isMatch) {
        console.log('Inicio de sesión exitoso');
        res.send({ message: 'Inicio de sesión exitoso' });
      } else {
        console.log('Contraseña incorrecta');
        res.send({ message: 'Nombre de usuario o contraseña incorrectos' });
      }
    } else {
      console.log('Usuario no encontrado en la base de datos');
      res.send({ message: 'Nombre de usuario o contraseña incorrectos' });
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).send({ error: 'Error en el servidor' });
  }
});

/**
 * 
 *
 * @function
 * @name POST /register
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Objeto JSON con un mensaje indicando el resultado del registro.
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Insertar el nuevo usuario en la base de datos
    const result = await db.query('INSERT INTO usuarios (nombre_usuario, contrasena) VALUES (?, ?)', { replacements: [username, password] });

    res.send({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).send({ error: 'Error en el servidor' });
  }
});

// Exportar el router para su uso en otros módulos
export { router };
