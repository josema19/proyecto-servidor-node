// Importar Configuración de Sequelize
const db = require('./db');

// Importar Modelos
require('../models/User');
require('../models/Product');
require('../models/Recipe');

// Crear Conexión
const conexionDB = async () => {
    // Intentar Conectar a la BD
    try {
        await db.sync();
        console.log('Base de Datos Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1);
    };
};

// Exportar conexión
module.exports = conexionDB;
