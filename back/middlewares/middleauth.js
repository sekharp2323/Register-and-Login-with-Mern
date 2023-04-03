const jwt=require('jsonwebtoken');

const protect=async(req,res,next)=>{
    const token=req.header("x-auth-token");
    if(!token){
        return res.status(400).json({message:"Access denied,no token provided"});
    }
    jwt.verify(token,process.env.JWT_SECRET,(Error,validToken)=>{
        if(Error){
            return res.status(400).json({message:"Invalid Token"});
        }else{
            req.user=validToken;
            next();
        }
    })
}

module.exports=protect;