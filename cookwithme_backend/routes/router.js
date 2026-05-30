const express = require('express')

const userController = require('../controllers/userController')
const recipeController = require('../controllers/recipeController')
const downloadController = require('../controllers/downloadController')
const saveController = require('../controllers/saveController')
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

//add Download
router.post('/download/:id',jwtMiddleware,downloadController.addDownload)

//get all Downloads
router.get('/getdownload',jwtMiddleware,downloadController.getDownload)

//delete Download
router.delete('/deletedownload/:id',jwtMiddleware,downloadController.deleteDownload)

//add SaveRecipe
router.post('/saveRecipe/:id',jwtMiddleware,saveController.addSaverecipe)

//get all SaveRecipe
router.get('/getsaveRecipe',jwtMiddleware,saveController.getSaverecipe)

//delete SaveRecipe
router.delete('/deletesaveRecipe/:id',jwtMiddleware,saveController.deleteSaverecipe)

//delete Recipe
router.delete('/deleterecipe/:id',jwtMiddleware,recipeController.deleteRecipe)

//get all Users
router.get('/getallusers',jwtMiddleware,userController.getAllUsers)

//add Recipe
router.post('/addrecipe',jwtMiddleware,recipeController.addRecipe)

//update Recipe
router.put('/updaterecipe/:id',jwtMiddleware,recipeController.updateRecipe)

//update Profile
router.put('/updateprofile',jwtMiddleware,userController.updateProfile)

//getprofile
router.get('/profile', jwtMiddleware, userController.getProfile)


module.exports = router