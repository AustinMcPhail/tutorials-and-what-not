const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const headerValue = req.header('Authorization');
  if (!headerValue) {
    return res.status(401).json({ msg: 'Missing Authorization header' });
  }
  const token = headerValue.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'Missing token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    const user = await User.findById(decoded.user.id).select('-password').select('-__v');
    if (!user) {
      res.status(401).json({ msg: 'Invalid token, authorization denied' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token, authorization denied' });
  }
};
