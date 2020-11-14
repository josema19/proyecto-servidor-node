// Importar Librerías
const express = require('express');
const router = express.Router();

// Importar Middleware de Autenticación
const auth = require('../middleware/auth');

// Importar Controlador
const filesController = require('../controllers/filesController');

// Definir Rutas
router.post('/',
    // auth,
    filesController.loadFile
);

router.delete('/:id',
    // auth,
    filesController.deleteFile
);


module.exports = router;