// Importar Librerías
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

// Configurar parámetros del archivo
const configuracionMulter = {
    limits: { fileSize: 1024 * 1024 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '/../uploads');
        },
        filename: (_, file, cb) => {
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cb(null, `${shortid.generate()}${extension}`);
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

// Elimina un archivo del servidor
exports.deleteFile = (req, res, next) => {
    // Eliminar archivo del sistema
    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
        console.log('Archivo Eliminado');
        return next();
    } catch (error) {
        console.log(error);
    };
}