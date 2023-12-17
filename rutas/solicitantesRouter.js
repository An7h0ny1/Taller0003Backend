import express from "express";
import { crear, buscarId, buscar, actualizar, eliminar } from "../controladores/solicitantesController.js";

const routerPersonas = express.Router();

routerPersonas.get("/",(req,res) =>{
    res.send("Bienvenido");
});

routerPersonas.post("/crear",(req,res) =>{
   crear(req,res);
});

routerPersonas.get("/buscar/",(req,res) =>{
    buscar(req,res);
});


routerPersonas.get("/buscar/:id",(req,res) =>{
    buscarId(req,res);
});

routerPersonas.put("/actualizar/:id",(req,res) =>{
    actualizar(req,res);
});

routerPersonas.delete("/eliminar/:id",(req,res) =>{
    eliminar(req,res);
});

export {routerPersonas}