const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const token = req.header('miniURL-auth-token');
    if (!token) return res.status(401).json('authentication token not provided');
    const decoded = jwt.verify(token, process.env.JWT_PVT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};
