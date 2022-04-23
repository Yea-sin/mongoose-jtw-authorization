const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { email, userId } = decode;
    req.email = email;
    req.userId = userId;
    next();
  } catch (err) {
    next("authorization failed");
  }
};

module.exports = checkLogin;
