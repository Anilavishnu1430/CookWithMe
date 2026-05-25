const express = require('express')

const userController = require('../controllers/userController')
const recipeController = require('../controllers/recipeController')
const jwtMiddleware = require('../middleware/jwtMiddleware')

const router = new express.Router()

// User Register
router.post('/register', userController.registerUser)

// User Login
router.post('/login', userController.loginUser)

// Get All Recipes
router.get('/recipes', recipeController.getAllRecipes)

// Get A Recipe
router.get('/getarecipe/:id', recipeController.getARecipe)

module.exports = router