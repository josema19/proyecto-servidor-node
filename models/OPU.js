// Importar Librerías
const { DataTypes } = require('sequelize');

// Importar Configuración de Sequelize
const db = require('../config/db');

// Importar modelo de Ordenes
const Order = require('../models/Order');

// Definir Modelo Order
const OPU = db.define('OPU', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalBolivares: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    totalDolares: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

// Definir Asociaciones
OPU.belongsTo(Order);

// Exportar Modelo
module.exports = OPU;

