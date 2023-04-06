const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
  try {
    let ret="";
const token = req.headers.authorization.split(" ")[1];
console.log ( " *********** TOKEN VERIFICATION"  , token);
jwt.verify(token, "pkey",ret);
console.log("token: " , token);
console.log("ret: " , token);
next();
} catch(error){
  res.status(401).json({message: "Authentication failed "});
}
};
