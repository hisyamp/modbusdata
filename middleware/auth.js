const jwt = require("jsonwebtoken")
require("dotenv").config()

function cekLogin(req, res, next) {
    try {
      const token = req.header("auth-token");
      //console.log("token" + token);
      const val = jwt.verify(token, process.env.JWT_SECRET);
      //console.log(val);
      if (token && val) {
        //res.send(req.userModel);
        next();
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (error) {
      return res.status(401).json({ error });
    }
  }
  
  const verifyToken = (req,res,next) => {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        jwt.verify(bearerToken, process.env.JWT_SECRET,(err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                req.userData = authData
                next();
            }
        })
    }else{
        res.sendStatus(403)
    }
}

const extractJWT = (req,res,next) => {
}

module.exports = {
  cekLogin,
  verifyToken,
  extractJWT
}