const { clave } = require('./config');
const jwt = require('jsonwebtoken');
const authToken = {}

authToken.verify = (req,res,next)=> {
    var { authorization } = req.headers;
    if(authorization){
        authorization = authorization.replace('Bearer ', '')
    jwt.verify(authorization,clave,(error)=>{
        if(error){
            res.json({
                status:'error',
                message:'Token erroneo'
            }).status(401)
        }else{
            return next()
        }
    })
    }else{
        res.json({
            status:'error',
            message:'No tiene autorización'
        }).status(401)
    }
    
}
module.exports=authToken;