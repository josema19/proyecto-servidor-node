// Importar Librerías
const { validationResult } = require('express-validator');

// Importar Modelos
const Order = require('../models/Order');
const OPU = require('../models/OPU');

// Devuelve la información de todos pedidos
exports.getOrders = async (_, res) => {
    // Obtener información de todos los pedidos en la BD
    try {
        const orders = await Order.findAll();
        return res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar obtener la información de la Base de Datos' });
    };
};

// Devuelve la información de los pedidos asociados a un usuario
exports.getUserOrders = async (req, res) => {
    // Obtener id de los parámetros
    const { id } = req.params

    // Buscar en la BD y devolver respuesta
    try {
        const orders = await Order.findAll({
            where: {
                UserId: id
            }
        });
        return res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar obtener la información de la Base de Datos' });
    };
};

// Devuelve la información de un pedido según el id dado
exports.getOrder = async (req, res) => {
    // Obtener id de los parámetros
    const { id } = req.params

    // Buscar en la BD y devolver respuesta
    try {
        const order = await Order.findByPk(id);
        return res.status(200).json({ order });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar obtener la información de la Base de Datos' });
    };
};

// Almacena la información de una nueva orden en la BD
exports.createOrder = async (req, res) => {
    // Validar si existen errores y mandarlos al frontend
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    // Definir Instancia del Pedido
    const order = new Order(req.body);

    // Insertar en la BD
    try {
        await order.save();

        // Insertar productos en la tabla OPU
        const { products } = req.body
        products.forEach(async product => {
            const opu = new OPU({ ...product, OrderId: order.id });
            await opu.save();
        });

        // Devolver respuesta
        return res.status(200).json({ msg: 'El pedido fue registrado con éxito' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar almacenar la información en la Base de Datos' });
    };
};