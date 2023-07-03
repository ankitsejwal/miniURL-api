const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const token = req.header('miniUrl-auth-token');
    if (!token) return res.status(401).send('authentication token not provided');
    const decoded = jwt.verify(token, process.env.JWT_PVT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
