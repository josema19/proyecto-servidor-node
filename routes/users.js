// Importar Librerías
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Importar Controlador
const usersController = require('../controllers/usersController');

// Definir Rutas
router.get('/',
    auth,
    usersController.getUsers
);

router.get('/:id',
    auth,
    usersController.getUser
)

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

router.put('/:id',
    auth,
    [
        check('firstName', 'El nombre es obligatorio').notEmpty().escape(),
        check('lastName').escape(),
        check('typeCard', 'El tipo de cédula es obligatorio').notEmpty(),
        check('idCard', 'El número de cédula es obligatorio').notEmpty().isLength({ min: 7, max: 10 }).withMessage('La cédula debe tener al menos 7 números'),
        check('email', 'El correo no es válido').isEmail().normalizeEmail(),
        check('role', 'El campo role es obligatorio').notEmpty().escape(),
    ],
    usersController.loadFile,
    usersController.updateUser
);

router.delete('/:id',
    auth,
    usersController.deleteUser
);

// Exportar Rutas
module.exports = router;