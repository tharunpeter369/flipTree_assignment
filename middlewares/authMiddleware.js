// const { secretKey } = require('../config/jwt.config');
const jwt = require("../helpers/jwt");

const authenticateJWT = async (req, res, next) => {
  const bearerToken = req.headers.bearer;
  if(bearerToken){
    const token = bearerToken.split(" ")[1];
    console.log(token);
    // check for token
    if (!token) {
      return res.status(401).json({ error: "Token not found" });
    }
    let verify = await jwt.verifyToken(token);
    if (verify) {
      next();
    } else {
      return res.status(401).json({ error: "Invalid token" });
    }
  }else{
    return res.status(401).json({ error: "No Token Found" });
  }
 
};

module.exports = { authenticateJWT };
