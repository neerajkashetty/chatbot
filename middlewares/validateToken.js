const JWT = require('jsonwebtoken')

async function validateToken(req , res, next){

    const authToken = req.headers("authorization")

    if(authToken == null || authToken == undefined){
        return res.json({sucess: false , Message :"Access denied"})
    }
    JWT.verify(authToken, privateKey, async(err, token) =>{
        if(err) return({sucess:false , Message:"Error"})
        req.id = token;
    console.log(req.id)
    next();
    } )

}

module.exports = validateToken;