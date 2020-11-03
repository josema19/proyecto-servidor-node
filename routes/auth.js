// Importar Librerías
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Importar Middleware de Autenticación
const auth = require('../middleware/auth');

// Importar Controlador
const authController = require('../controllers/authController');

// Definir Rutas
router.post('/',
    [
        check('email', 'El email no es válido').isEmail(),
        check('password', 'El password no puede ser vacío').not().isEmpty(),
    ],
    authController.authenticateUser
);

router.get('/',
    auth,
    authController.userAuthenticated
);

module.exports = router;