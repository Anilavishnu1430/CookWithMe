const download = require('../models/downloadModel')

exports.addDownload = async(req,res)=>{

    console.log("inside download Recipe section");

    const {id} = req.params
    const userId = req.payload

    const {name,ingredients,instructions,cuisine,image} = req.body

    console.log(id,userId);

    try{

        const existingRecipe = await download.findOne({recipeId:id})

        if(existingRecipe){

            existingRecipe.count++

            await existingRecipe.save()

            res.status(200).json({
                message:"recipe already existing",existingRecipe
            })

        }
        else{

            const newDownload = new download({

                recipeId:id,
                name,
                ingredients,
                instructions,
                cuisine,
                image,
                userId,
                count:1

            })

            await newDownload.save()

            res.status(201).json({
                message:"recipe added",
                newDownload
            })

        }

    }
    catch(err){

        res.status(500).json({
            message:"server err "+err
        })

    }

}

exports.getDownload=async(req,res)=>{
    console.log("Inside the get Download");
    try{
        const getdownloads = await download.find()
        res.status(200).json({ message:"Alldownloads fetched",getdownloads })
    }
    catch(err){
        res.status(500).json({ message:"server err "+err })
    }
}

exports.deleteDownload=async(req,res)=>{
    console.log("Inside the delete Download");
    const {id} = req.params
    try{
        const deletedownloads = await download.deleteOne({_id:id})
        res.status(200).json({ message:"downloads deleted",deletedownloads })
    }
    catch(err){
        res.status(500).json({ message:"server err "+err })
    }
}