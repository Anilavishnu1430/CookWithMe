const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next) =>{
    console.log("Inside JWT");  
    try{
        const token =  req.headers.authorization.slice(7)
        console.log(token);
        jwtverification = jwt.verify(token,process.env.JWT_SECRET)
        console.log(jwtverification);
        req.payload = jwtverification.userId
        next()
    }
    catch(err){
        res.status(401).json("Authorization error...")
    }
}

module.exports = jwtMiddleware