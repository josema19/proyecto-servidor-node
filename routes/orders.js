// Importar Librerías
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Importar Middleware de Autenticación
const auth = require('../middleware/auth');

// Importar Controlador
const ordersController = require('../controllers/ordersController');

// Definir Rutas
router.get('/',
    auth,
    ordersController.getOrders,
);

router.get('/user/:id',
    auth,
    ordersController.getUserOrders,
);

router.get('/:id',
    auth,
    ordersController.getOrder,
);

router.post('/',
    auth,
    [
        check('coinType', 'El tipo de moneda es obligatorio').notEmpty(),
        check('paymentType', 'El tipo de pago es obligatorio').notEmpty(),
        check('state', 'El estado del pedido no puede ser vacío').notEmpty(),
        check('service', 'El tipo de servicio no puede ser vacío').notEmpty(),
        check('totalProducts', 'El total de productos no puede ser vacía').notEmpty(),
        check('totalBolivares', 'El total en bolívares es obligatorio').notEmpty(),
        check('totalDolares', 'El total en dólares es obligatorio').notEmpty(),
    ],
    ordersController.createOrder,
);

router.put('/:id',
    auth,
    [
        check('state', 'El estado del pedido no puede ser vacío').notEmpty(),
    ],
    ordersController.updateOrder,
);

// Exportar Rutas
module.exports = router;