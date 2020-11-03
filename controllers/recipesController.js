// Importar Librerías
const { validationResult } = require('express-validator');

// Importar Modelos
const Recipe = require('../models/Recipe');

// Devuelve la información de todas las recetas
exports.getRecipes = async (_, res) => {
    // Obtener información de todas las recetas en la BD
    try {
        const recipes = await Recipe.findAll();
        return res.status(200).json({ recipes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar obtener la información de la Base de Datos' });
    }
};

// Devuelve la información de una receta según el id dado
exports.getRecipe = async (req, res) => {
    // Obtener id de los parámetros
    const { id } = req.params

    // Buscar en la BD y devolver respuesta
    try {
        const recipe = await Recipe.findByPk(id);;
        return res.status(200).json({ recipe });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar obtener la información de la Base de Datos' });
    };
};

// Crea un nuevo producto en la BD
exports.createRecipe = async (req, res) => {
    // Validar si existen errores y mandarlos al frontend
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };

    // Definir Instancia de la Receta
    recipe = new Recipe(req.body);

    // Insertar en la BD
    try {
        await recipe.save();
        return res.status(200).json({ msg: 'La receta fue creada con éxito' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar almacenar la información en la Base de Datos' });
    };
};

// Actualiza la información de una receta en la BD
exports.updateRecipe = async (req, res) => {
    // Validar si existen errores y mandarlos al frontend
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };

    // Obtener id de los parámetros
    const { id } = req.params

    // Validar que el usuario se encuentre registrado en la BD
    if (!(await Recipe.findByPk(id))) {
        return res.status(400).json({ msg: 'La receta no se encuentra registrada' });
    };

    // Actualizar información en la BD
    try {
        const updatedFields = req.body;
        await Recipe.update(
            updatedFields, {
            where: {
                id
            }
        });
        return res.status(200).json({ msg: 'La información de la receta se actualizó correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar actualizar la información de la receta' });
    };
};

// Elimina la información de una receta
exports.deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params
        await Recipe.destroy({
            where: {
                id
            }
        });
        return res.status(200).json({ msg: 'La receta se eliminó correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al intentar eliminar la información de la receta' });
    };
};