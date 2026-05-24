const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({

    name:String,

    ingredients:Array,

    instructions:Array,

    prepTimeMinutes:Number,

    cookTimeMinutes:Number,

    servings:Number,

    difficulty:String,

    cuisine:String,

    caloriesPerServing:Number,

    image:String,

    rating:Number,

    reviewCount:Number,

    mealType:Array

})

const recipes = mongoose.model( "recipes",recipeSchema )

module.exports = recipes