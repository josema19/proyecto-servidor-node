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
        },
    }),
    fileFilter: (req, file, cb) => {
        if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/jpg') || (file.mimetype === 'image/png')) {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'), false);
        };
    }
};

// // Definir multer
const upload = multer(configuracionMulter).single('file');

// Configurar parámetros del archivo PDF
const configuracionMulterPayment = {
    limits: { fileSize: 1024 * 1024 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '/../uploads');
        },
        filename: (_, file, cb) => {
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cb(null, `${shortid.generate()}${extension}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'), false);
        };
    },
};

const uploadPayment = multer(configuracionMulterPayment).single('file');

// Carga una imagen en el servidor
exports.loadFile = (req, res, next) => {
    // Subir el archivo y mostrar los errores si es el caso
    upload(req, res, async (error) => {
        if (error) {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    res.status(400).json({ msg: 'El archivo es muy grande: Máximo 100KB' });
                } else {
                    res.status(400).json({ msg: error.message });
                };
            } else {
                res.status(400).json({ msg: error.message });
            };
        } else {
            res.status(200).json({ file: req.file.filename });
            return next();
        }
    });
}

// Carga un pdf en el servidor
exports.loadFilePayment = (req, res, next) => {
    // Subir el archivo y mostrar los errores si es el caso
    uploadPayment(req, res, async (error) => {
        if (error) {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    res.status(400).json({ msg: 'El archivo es muy grande: Máximo 100KB' });
                } else {
                    res.status(400).json({ msg: error.message });
                };
            } else {
                res.status(400).json({ msg: error.message });
            };
        } else {
            res.status(200).json({ archivo: req.file.filename });
            return next();
        }
    });
};

// Elimina un archivo del servidor
exports.deleteFile = (req, _, next) => {
    // Eliminar archivo del sistema
    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
        return next();
    } catch (error) {
        console.log(error);
    };
}