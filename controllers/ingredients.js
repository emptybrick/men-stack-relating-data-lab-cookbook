// controllers/ingredients.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');
const req = require('express/lib/request.js');

// router logic will go here - will be built later on in the lab

router.get('/', async (req, res) => {
    try {
        const Ingredients = await Ingredient.find();
        res.render('ingredients/index.ejs', { ingredients: Ingredients });
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newIngredient = new Ingredient(req.body);
        await Ingredient.create(newIngredient);
        res.redirect('/ingredients')
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        await Ingredient.findByIdAndDelete(req.params.id)
        res.redirect('/ingredients')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;