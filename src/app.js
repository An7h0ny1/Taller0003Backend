import express from "express";
import { db } from "../database/conexion.js";
import { routerMascotas } from "../rutas/mascotasRouter.js";
import { routerPersonas } from "../rutas/solicitantesRouter.js";
import { routerSolicitud } from "../rutas/solicitudRouter.js";

const app = express();

app.use(express.json()); 

//Verificar Conexion a Base de Datos
db.authenticate().then(()=>{
    console.log(`Base de Datos conectada de manera exitosa`);
}).catch(err=>{
    console.log(`Error al conectarse a la Base de Datos ::: ${err}`);
})

const PORT = 8000;

app.use("/mascotas", routerMascotas);
app.use("/solicitantes", routerPersonas);
app.use("/solicitudes", routerSolicitud);

//Verificar que pueda sincronizar con la base de datos
db.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Servidor Inicializado en puerto ${PORT}`);
    });
}).catch(err=>{
    console.log(`Error al sincronizar Base de Datos ${err}`);
});

