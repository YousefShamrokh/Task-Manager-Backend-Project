const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  try {
    const fulltoken =  req.headers.authorization
    const token = fulltoken?.split(' ')[1] // JWT
    
    if(!token) res.status(403).send("Access Denied");
    const decodedToken = jwt.verify(token, 'secretKey')
    req.user = decodedToken
    next()

  } catch (err) {
    console.log("🚀 ~ err:", err);
    res.status(400).send("Invalid Token");
  }
};