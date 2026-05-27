const recipe = require('../models/recipeModel')
const jwt = require('jsonwebtoken')

exports.getAllRecipes = async (req, res) => {
    console.log("Inside Recipe section");
    try {
        const recipes = await recipe.find()
        res.status(200).json({ message: "Recipes fetched successfully", recipes })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err })
    }
}

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
