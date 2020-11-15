// Importar Librerías
const express = require('express');
const cors = require('cors');
const conexionDB = require('./config/conexion');
require('dotenv').config({ path: 'variables.env' });

// Definir Conexión a la BD
conexionDB();

// Definir Servidor y Puerto
const app = express();
const port = process.env.PORT || 4000;

// Habilitar Cors
app.use(cors());

// Habilitar Express.json
app.use(express.json({ extended: true }));

// Habilitar Carpeta Pública para Guardar las imágenes en el servidor
app.use(express.static('uploads'));

// Habilitar Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/files', require('./routes/files'));
app.use('/api/products', require('./routes/products'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/orders', require('./routes/orders'));

// Arracar Servidor
app.listen(port, process.env.HOST, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
})