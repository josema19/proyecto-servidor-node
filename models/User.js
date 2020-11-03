// Importar Librerías
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');

// Importar Configuración de Sequelize
const db = require('../config/db');

// Definir Modelo User
const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cardType: {
        type: DataTypes.STRING(1),
        allowNull: false,
    },
    cardId: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    },
}, {
    hooks: {
        beforeCreate(user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
    }
});

// Exportar Modelo
module.exports = User;