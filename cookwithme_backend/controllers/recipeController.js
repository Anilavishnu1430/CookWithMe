const recipe = require('../models/recipeModel')
const jwt = require('jsonwebtoken')

//Get All Recipes
exports.getAllRecipes = async (req, res) => {
    console.log("Inside Recipe section");
    try {
        const recipes = await recipe.find()
        res.status(200).json({ message: "Recipes fetched successfully", recipes })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err })
    }
}

//Get A Recipe
exports.getARecipe = async (req, res) => {
    console.log("Inside Get A Recipe");
    const { id } = req.params
    console.log(id);
    try {
        const getARecipe = await recipe.findById(id)
        res.status(200).json({ message: "Recipe fetched successfully", getARecipe })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err })
    }
}

//Delete Recipe
exports.deleteRecipe=async(req,res)=>{
    console.log("Inside the delete Recipe");
    const {id} = req.params
    try{
        const deleteRecipe = await recipe.deleteOne({_id:id})
        res.status(200).json({ message:"Recipe deleted",deleteRecipe })
    }
    catch(err){
        res.status(500).json({ message:"server err "+err })
    }
}

//Add Recipe
exports.addRecipe = async (req, res) => {
    console.log("Inside add recipe");

    const { name,prepTimeMinutes,cuisine,image,ingredients,cookTimeMinutes,servings,difficulty,caloriesPerServing,instructions,mealType } = req.body

    console.log(req.body);

    try {
        const existingRecipe = await recipe.findOne({ name })
        if (existingRecipe) {
            res.status(401).json({ message: "Recipe already existing..." })
        }
        else {
            const newRecipe = new recipe({ name,prepTimeMinutes,cuisine,image,ingredients,cookTimeMinutes,servings,difficulty,caloriesPerServing,instructions,mealType })
            await newRecipe.save()
            res.status(200).json({message: "Recipe added successfully...",newRecipe})
        }
    }
    catch (err) {
        res.status(500).json({message: "Server error",err});
    }
}

//Update Recipe
exports.updateRecipe = async (req, res) => {
    console.log("Inside Update Recipe")

    const { id } = req.params
    console.log(id)

    const {name,prepTimeMinutes,cuisine,image,ingredients,cookTimeMinutes,servings,difficulty,caloriesPerServing,instructions,mealType} = req.body

    try {
        const updateRecipe = await recipe.findByIdAndUpdate(id,{name,prepTimeMinutes,cuisine,image,ingredients,cookTimeMinutes,servings,difficulty,caloriesPerServing,instructions,mealType},{ new: true })

        res.status(200).json({message: "Recipe Details updated successfully...",updateRecipe})
    }
    catch (err) {
        res.status(500).json({message: "Server err",err})
    }

}
