const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //middleware func, access to req-res object/cycle, plus a callback func:what to do when we're done

  //Get token from header
  const token = req.header("x-auth-token");

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //Varify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next(); //it will be part of funcs in router.method, so need next&next() to pass to next callback func
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
