// controllers/recipes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Food = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

// router logic will go here - will be built later on in the lab

router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    const allRecipes = await Food.find();
    const filteredRecipes = allRecipes.filter((recipe) => recipe.owner.equals(currentUser._id));
    res.render('recipes/index.ejs', { recipes: filteredRecipes });
});

router.get('/new', async (req, res) => {
    const ingredients = await Ingredient.find();
    res.render('recipes/new.ejs', { ingredients });
});

router.post('/', async (req, res) => {
    try {
        const newRecipe = new Food(req.body);
        newRecipe.owner = req.session.user._id;
        await Food.create(newRecipe);
        res.redirect('/recipes');
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const currentRecipe = await Food.findById(req.params.id);
        const ownerName = await User.findById(currentRecipe.owner);
        const allIngredients = await Ingredient.find();
        const filteredIngredients = currentRecipe.ingredients
            .map(ingredient =>
                allIngredients.find(ing => ing._id.equals(ingredient._id))
            );
        res.render('recipes/show.ejs', { recipe: currentRecipe, owner: ownerName.username, ingredients: filteredIngredients });
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const currentRecipe = await Food.findById(req.params.id);
        if (currentRecipe.owner.equals(req.session.user._id)) {
            await currentRecipe.deleteOne();
            res.redirect('/recipes');
        } else {
            res.redirect('/recipes');
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const currentRecipe = await Food.findById(req.params.id);
        if (currentRecipe.owner.equals(req.session.user._id)) {
            const allIngredients = await Ingredient.find();
            const filteredIngredients = currentRecipe.ingredients
                .map(ingredient =>
                    allIngredients.find(ing => ing._id.equals(ingredient._id))
                );
            res.render('recipes/edit.ejs', { recipe: currentRecipe, ingredients: filteredIngredients, allIngredients: allIngredients });
        } else {
            res.redirect('/recipes');
        }
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const currentRecipe = await Food.findById(req.params.id);
        await currentRecipe.set(req.body);
        await currentRecipe.save();
        res.redirect(`/recipes/${ currentRecipe._id }`);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
