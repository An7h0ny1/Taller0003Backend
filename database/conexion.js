import Sequelize from "sequelize";

const db = new Sequelize("adopcion", "mascotas", "mascotas2023",{
    host: 'localhost',
    dialect: 'mysql'
});

export {db}