// Importar Librerías
const { DataTypes } = require('sequelize');

// Importar Configuración de Sequelize
const db = require('../config/db');

// Definir Modelo Product
const Product = db.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantityAvailable: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Exportar Modelo
module.exports = Product;