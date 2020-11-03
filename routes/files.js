// Importar Librerías
const express = require('express');
const router = express.Router();

// Importar Middleware de Autenticación
const auth = require('../middleware/auth');

// Importar Controlador
const filesController = require('../controllers/filesController');

// Definir Rutas
router.post('/',
    filesController.loadFile
)

router.delete('/:id',
    filesController.deleteFile
)


module.exports = router;