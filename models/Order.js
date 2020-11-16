// Importar Librerías
const { DataTypes } = require('sequelize');

// Importar Configuración de Sequelize
const db = require('../config/db');

// Importar modelo de Usuarios
const User = require('../models/User');
const OPU = require('../models/OPU');

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
    paymentType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalProducts: {
        type: DataTypes.INTEGER,
    },
    totalBolivares: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    totalDolares: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    voucher: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

// Definir Asociaciones
Order.belongsTo(User);
Order.hasMany(OPU, { as: 'products' });

// Exportar Modelo
module.exports = Order;