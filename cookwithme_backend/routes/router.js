const express = require('express')

const userController = require('../controllers/userController')
const recipeController = require('../controllers/recipeController')
const downloadController = require('../controllers/downloadController')
const jwtMiddleware = require('../middleware/jwtMiddleware')

const router = new express.Router()

// User Register
router.post('/register', userController.registerUser)

// User Login
router.post('/login', userController.loginUser)

// Get All Recipes
router.get('/recipes', recipeController.getAllRecipes)

// Get A Recipe
router.get('/getarecipe/:id',jwtMiddleware, recipeController.getARecipe)

router.post('/download/:id',jwtMiddleware,downloadController.addDownload)

router.get('/getdownload',jwtMiddleware,downloadController.getDownload)

router.delete('/deletedownload/:id',jwtMiddleware,downloadController.deleteDownload)

module.exports = router