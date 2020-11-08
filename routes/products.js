// Importar Librerías
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Importar Controlador
const productsController = require('../controllers/productsController');
const filesController = require('../controllers/filesController');

// Definir Rutas
router.get('/',
    productsController.getProducts
);

router.get('/:code',
    productsController.getProduct
)

router.post('/',
    auth,
    [
        check('name', 'El nombre es obligatorio').notEmpty().escape(),
        check('price', 'El precio es obligatorio').notEmpty().escape(),
        check('code', 'El código es obligatorio').notEmpty().escape(),
        check('quantityAvailable', 'La cantidad es obligatoria').notEmpty().escape(),
        check('description', 'La descripción es obligatoria').notEmpty().escape(),
    ],
    productsController.createProduct
);

router.put('/:code',
    [
        check('name', 'El nombre es obligatorio').notEmpty().escape(),
        check('price', 'El precio es obligatorio').notEmpty().escape(),
        check('code', 'El código es obligatorio').notEmpty().escape(),
        check('quantityAvailable', 'La cantidad es obligatoria').notEmpty().escape(),
        check('description', 'La descripción es obligatoria').notEmpty().escape(),
    ],
    auth,
    productsController.updateProduct,
    filesController.deleteFile,
);

router.delete('/:code',
    auth,
    productsController.deleteProduct,
    filesController.deleteFile,
);

// Exportar Rutas
module.exports = router;