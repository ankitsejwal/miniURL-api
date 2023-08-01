const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  console.log(req.headers.authorization);
  try {
    console.log('entered try');
    const authorization = req.headers.authorization;
    const bits = authorization.split(' ');
    let token = null;
    console.log('bits: ', bits);
    if (bits.length === 2) {
      if (bits[0] === 'Bearer') {
        console.log('Bearer found');
        token = bits[1];
        if (!token) return res.status(401).json({ message: 'authentication token not provided' });
        const decoded = jwt.verify(token, process.env.JWT_PVT_KEY);
        req.user = decoded;
        next();
      }
    } else {
      res.status(401).json({ message: 'invalid token bits' });
    }
  } catch (error) {
    console.log('entered catch');
    res.status(400).json({ message: error.data });
  }
};
