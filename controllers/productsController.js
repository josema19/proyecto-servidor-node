// Importar Librerías
const multer = require('multer');
const shortid = require('shortid');
const { validationResult } = require('express-validator');

// Importar Modelos
const Product = require('../models/Product');

// Configurar parámetros del archivo
const configuracionMulter = {
    limits: { fileSize: 1024 * 1024 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '/../uploads/products');
        },
        filename: (_, file, cb) => {
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cb(null, `${shortid.generate()}${extension}`);
        },
        fileFilter: (req, file, cb) => {
            if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/png')) {
                cb(null, true);
            } else {
                cb(new Error('Formato no válido'), false);
            };
        }
    })
};

// Definir multer
const upload = multer(configuracionMulter).single('file');

// Carga un archivo en el servidor
exports.loadFile = (req, res, next) => {
    // Subir el archivo y mostrar los errores si es el caso
    upload(req, res, async (error) => {
        if (!error) {
            res.status(200).json({ archivo: req.file.filename });
        } else {
            console.log(error);
            return next();
        };
    });
}

// Devuelve la información de todos los productos
exports.getProducts = async (_, res) => {
    // Obtener información de todos los productos en la BD
    try {
        const products = await Product.findAll();
        return res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar obtener la información de la Base de Datos' });
    }
};

// Devuelve la información de un usuario según el id dado
exports.getProduct = async (req, res) => {
    // Obtener id de los parámetros
    const { code } = req.params

    // Buscar en la BD y devolver respuesta
    try {
        const product = await Product.findOne({ where: { code } });
        return res.status(200).json({ product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar obtener la información de la Base de Datos' });
    };
};

// Crea un nuevo producto en la BD
exports.createProduct = async (req, res) => {
    // Validar si existen errores y mandarlos al frontend
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };

    // Validar que el producto no se encuentra registrado en la BD
    const { code } = req.body;
    let product = await Product.findOne({
        where: {
            code
        }
    });
    if (product) {
        return res.status(400).json({ msg: 'El producto ya se encuentra registrado' });
    };

    // Definir Instancia del Producto
    product = new Product(req.body);

    // Insertar en la BD
    try {
        await product.save();
        return res.status(200).json({ msg: 'El producto fue creado con éxito' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar almacenar la información en la Base de Datos' });
    };
};

// Actualiza la información de un producto en la BD
exports.updateProduct = async (req, res) => {
    // Validar si existen errores y mandarlos al frontend
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };

    // Obtener id de los parámetros
    const { code } = req.params

    // Validar que el producto se encuentra registrado en la BD
    if (!(await Product.findOne({ where: { code } }))) {
        return res.status(400).json({ msg: 'El producto no se encuentra registrado' });
    };

    // Actualizar información en la BD
    try {
        const updatedFields = req.body;
        await Product.update(
            updatedFields, {
            where: {
                code
            }
        });
        return res.status(200).json({ msg: 'La información del producto se actualizó correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar actualizar la información del producto' });
    };
};

// Elimina la información de un producto
exports.deleteProduct = async (req, res) => {
    try {
        const { code } = req.params
        await Product.destroy({
            where: {
                code
            }
        });
        return res.status(200).json({ msg: 'El producto se eliminó correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar eliminar la información del producto' });
    };
};