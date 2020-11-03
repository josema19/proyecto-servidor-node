// Importar Librerías
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Importar Controlador
const ordersController = require('../controllers/ordersController');

// Definir Rutas
router.post('/',
    ordersController.createOrder
)