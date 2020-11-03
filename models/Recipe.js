// Importar Librerías
const { DataTypes } = require('sequelize');

// Importar Configuración de Sequelize
const db = require('../config/db');

// Definir Modelo Recipe
const Recipe = db.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preparation: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Exportar Modelo
module.exports = Recipe;