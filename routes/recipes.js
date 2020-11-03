// Importar Librerías
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Importar Controlador
const recipesController = require('../controllers/recipesController');

// Definir Rutas
router.get('/',
    recipesController.getRecipes
);

router.get('/:id',
    recipesController.getRecipe
);

router.post('/',
    [
        check('name', 'El nombre es obligatorio').notEmpty().escape(),
        check('ingredients', 'Los ingredientes son obligatorios').notEmpty(),
        check('preparation', 'La preparación es obligatoria').notEmpty(),
    ],
    auth,
    recipesController.createRecipe
);

router.put('/:id',
    [
        check('name', 'El nombre es obligatorio').notEmpty().escape(),
        check('ingredients', 'Los ingredientes son obligatorios').notEmpty(),
        check('preparation', 'La preparación es obligatoria').notEmpty(),
    ],
    auth,
    recipesController.updateRecipe
);

router.delete('/:id',
    auth,
    recipesController.deleteRecipe
);

// Exportar Rutas
module.exports = router;