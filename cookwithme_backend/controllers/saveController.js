const saverecipe = require('../models/saveModel')

//add Save
exports.addSaverecipe = async(req,res)=>{
    console.log("inside Save Recipe section");

    const {id} = req.params
    const userId = req.payload
    const {name,ingredients,instructions,cuisine,image} = req.body
    console.log(id,userId);

    try{
        const existingRecipe = await saverecipe.findOne({recipeId:id,userId})
        if(existingRecipe){
            existingRecipe.count++
            await existingRecipe.save()
            res.status(200).json({message:"recipe already saved",existingRecipe})
        }
        else{
            const newSaverecipe = new saverecipe({recipeId:id,name,ingredients,instructions,cuisine,image,userId,count:1})
            await newSaverecipe.save()
            res.status(201).json({ message:"recipe Saved", newSaverecipe })
        }
    }
    catch(err){
        res.status(500).json({
            message:"server err "+err
        })

    }

}

//Get All Saverecipe
exports.getSaverecipe=async(req,res)=>{
    console.log("Inside the get Download");
    const userId = req.payload
    try{
        const getSaverecipe = await saverecipe.find({ userId })
        res.status(200).json({ message:"All Saved Recipe fetched",getSaverecipe })
    }
    catch(err){
        res.status(500).json({ message:"server err "+err })
    }
}

//Delete Saverecipe
exports.deleteSaverecipe=async(req,res)=>{
    console.log("Inside the delete Download");
    const {id} = req.params
    try{
        const deleteSaverecipe = await saverecipe.deleteOne({_id:id})
        res.status(200).json({ message:"Recipe deleted",deleteSaverecipe })
    }
    catch(err){
        res.status(500).json({ message:"server err "+err })
    }
}