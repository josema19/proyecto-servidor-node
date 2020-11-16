// Importar Librerías
const { validationResult } = require('express-validator');

// Importar Modelos
const Order = require('../models/Order');
const OPU = require('../models/OPU');
const User = require('../models/User');
const Product = require('../models/Product');

// Devuelve la información de todos pedidos
exports.getOrders = async (_, res) => {
  // Obtener información de todos los pedidos en la BD
  try {
    const orders = await Order.findAll({ include: [User, { model: OPU, as: 'products' }] });
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
      },
      include: {
        model: OPU, as: 'products'
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
    const order = await Order.findByPk(id, { include: { model: OPU, as: 'products' } });
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
      // Definir nueva instancia de opu
      const opu = new OPU({ ...product, OrderId: order.id });

      // Obtener producto de la BD
      const proBD = await Product.findOne({ where: { code: product.code } })

      // Definir arreglo de promesas para guardar la información en la tabla opu y
      // actualizar la tabla de productos
      let promises = [
        opu.save(),
        Product.update(
          { quantityAvailable: proBD.quantityAvailable - product.quantity },
          {
            where: {
              code: product.code
            }
          },
        ),
      ];

      // Esperar que todas las promesas se ejecuten
      await Promise.all(promises);
    });

    // Devolver respuesta
    return res.status(200).json({ msg: 'El pedido fue registrado con éxito' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Hubo un error al intentar almacenar la información en la Base de Datos' });
  };
};

// Actualiza la información de un usuario en la BD
exports.updateOrder = async (req, res) => {
  // Validar si existen errores y mandarlos al frontend
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  };

  // Obtener id de los parámetros
  const { id } = req.params

  // Validar que el usuario se encuentre registrado en la BD
  const order = await Order.findByPk(id);
  if (!order) {
    return res.status(400).json({ msg: 'No existe información del pedido' });
  };

  // Actualizar información del estado de una orden en la BD
  try {
    await Order.update(
      req.body, {
      where: {
        id
      }
    });
    return res.status(200).json({ msg: 'La información del pedido se actualizó correctamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Hubo un error al intentar actualizar la información del pedido' });
  };
};
