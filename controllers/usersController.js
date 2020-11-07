// Importar Librerías
const multer = require('multer');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Importar Modelos
const User = require('../models/User');

// Devuelve la información de todos los usuarios
exports.getUsers = async (_, res) => {
    // Obtener información de todos los usuarios en la BD
    try {
        const users = await User.findAll();
        return res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar obtener la información de la Base de Datos' });
    };
};

// Devuelve la información de un usuario según el id dado
exports.getUser = async (req, res) => {
    // Obtener id de los parámetros
    const { id } = req.params

    // Buscar en la BD y devolver respuesta
    try {
        const user = await User.findByPk(id);
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar obtener la información de la Base de Datos' });
    };
};

// Crea un nuevo usuario en la BD
exports.createUser = async (req, res, next) => {
    // Validar si existen errores y mandarlos al frontend
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    // Validar que el usuario no se encuentre registrado en la BD
    const { email } = req.body;
    let user = await User.findOne({
        where: {
            email,
        }
    });
    if (user) {
        return res.status(400).json({ msg: 'El usuario ya se encuentra registrado' });
    };

    // Definir Instancia del Usuario
    user = new User(req.body);

    // Insertar en la BD
    try {
        await user.save();
        return res.status(200).json({ msg: 'El usuario fue creado con éxito' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar almacenar la información en la Base de Datos' });
    };
};

// Actualiza la información de un usuario en la BD
exports.updateUser = async (req, res) => {
    // Validar si existen errores y mandarlos al frontend
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };

    // Obtener id de los parámetros
    const { id } = req.params

    // Validar que el usuario se encuentre registrado en la BD
    if (!(await User.findByPk(id))) {
        return res.status(400).json({ msg: 'El usuario no se encuentra registrado' });
    };

    // Actualizar información en la BD
    try {
        const updatedFields = req.body;
        await User.update(
            updatedFields, {
            where: {
                id
            }
        });
        return res.status(200).json({ msg: 'La información del usuario se actualizó correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar actualizar la información del usuario' });
    };
};

// Elimina la información de un usuario
exports.deleteUser = async (req, res) => {
    // Eliminar información del usuario
    try {
        const [id] = req.params.id
        await User.destroy({
            where: {
                id
            }
        });
        return res.status(200).json({ msg: 'El usuario se eliminó correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar eliminar la información del usuario' });
    };
};

// Actualiza el password de un usuario en la BD
exports.forgottenPassword = async (req, res) => {
    // Revisar errores con express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    // Verificar si el usuario no está registrado
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } })
    if (!user) {
        return res.status(401).json({ msg: 'El usuario no existe' });
    };

    // Codificar password
    const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // Actualizar password
    try {
        await User.update(
            { password: newPassword }, {
            where: {
                email
            }
        });
        return res.status(200).json({ msg: 'El password se actualizó correctamente' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar actualizar el password en la BD' });
    }
};