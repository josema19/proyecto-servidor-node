// Importar Librerías
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Importar Controladores
const usersController = require('../controllers/usersController');
const filesController = require('../controllers/filesController');

// Definir Rutas

// Obtener un usuario
router.get('/',
    auth,
    usersController.getUsers
);

// Obtener todos los usuarios
router.get('/:id',
    auth,
    usersController.getUser
);

// Registrar nuevo usuario
router.post('/',
    [
        check('cardType', 'El tipo de cédula es obligatorio').notEmpty(),
        check('cardId', 'El número de cédula es obligatorio').notEmpty().isLength({ min: 7, max: 10 }).withMessage('La cédula debe tener al menos 7 números'),
        check('address', 'La dirección es obligatoria').notEmpty(),
        check('email', 'El correo no es válido').isEmail().normalizeEmail(),
        check('firstName', 'El nombre es obligatorio').notEmpty().escape(),
        check('lastName', 'El apellido es obligatorio').notEmpty().escape(),
        check('password', 'El password es obligatorio').notEmpty().isLength({ min: 6 }).withMessage('El password requiere mínimo 6 caracteres'),
        check('phoneType', 'La extensión del teléfono es obligatoria').notEmpty(),
        check('phoneNumber', 'El número de teléfono es obligatorio').notEmpty(),
    ],
    usersController.createUser
);

// Cambiar contraseña
router.post('/forgotten-password',
    [
        check('email', 'El email no es válido').isEmail(),
        check('password', 'El password es obligatorio').notEmpty().isLength({ min: 6 }).withMessage('El password requiere mínimo 6 caracteres'),
    ],
    usersController.forgottenPassword,
);

// Actualizar información del usuario
router.put('/:id',
    auth,
    [
        check('address', 'La dirección es obligatoria').notEmpty(),
        check('firstName', 'El nombre es obligatorio').notEmpty().escape(),
        check('lastName', 'El apellido es obligatorio').notEmpty().escape(),
        check('phoneType', 'La extensión del teléfono es obligatoria').notEmpty(),
        check('phoneNumber', 'El número de teléfono es obligatorio').notEmpty(),
    ],
    usersController.updateUser,
    filesController.deleteFile,
);

// Eliminar usuario
router.delete('/:id',
    auth,
    usersController.deleteUser
);

// Exportar Rutas
module.exports = router;