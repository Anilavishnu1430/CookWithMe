require('dotenv').config()

const express = require('express')

const cors = require('cors')

require('./config/connection')

const router = require('./routes/router')

const cookWithMeServer = express()

cookWithMeServer.use(cors())

cookWithMeServer.use(express.json())

cookWithMeServer.use(router)

const PORT = process.env.PORT || 3000

cookWithMeServer.listen(PORT,()=>{
    console.log("Server running on "+PORT);
})

cookWithMeServer.get('/',(req,res)=>{
    res.send("Welcome to CookWithMe Server")
})