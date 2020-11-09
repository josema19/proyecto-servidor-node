// Importar Librerías
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config({ path: 'variables.env' });

// Importar Modelos
const User = require('../models/User');

// Autentica a un usuario dentro de la aplicación
exports.authenticateUser = async (req, res, next) => {
    // Revisar errores con express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    // Verificar si el usuario no está registrado
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } })
    if (!user) {
        res.status(401).json({ msg: 'El usuario no existe' });
        return next();
    };

    // Verificar el password
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ msg: 'El password es incorrecto' });
    };

    // Generar Json Web Token y enviar como respuesta
    const token = jwt.sign(
        {
            id: user.id,
            address: user.address,
            email: user.email,
            firstName: user.firstName,
            image: user.image,
            lastName: user.lastName,
            card: user.cardType + '-' + user.cardId,
            phone: user.phoneType + '-' + user.phoneNumber,
            role: user.role,
        },
        process.env.SECRETA,
        { expiresIn: '8h' }
    );
    res.status(200).json({ token });
    return next();
};

// Devuelve la información del usuario contenida en el token
exports.userAuthenticated = async (req, res, next) => {
    if (!req.user) {
        return res.status(400).json({ msg: 'El token no es válido' });
    }
    // Devolver usuario y continuar ejecución
    res.status(200).json({ user: req.user });
    return next();
};