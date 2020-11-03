// Importar Librerías
const { DataTypes } = require('sequelize');

// Importar Configuración de Sequelize
const db = require('../config/db');

// Importar modelo de Usuarios
const User = require('../models/User');

// Definir Modelo Order
const Order = db.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    coinType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productsList: {
        type: DataTypes.ARRAY
    },
    payment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    voucher: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

// Definir Asociaciones
Order.belongsTo(User);

// Exportar Modelo
module.exports = Order;