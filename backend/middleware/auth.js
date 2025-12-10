// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authRequired = async (req, res, next) => {
    const auth = req.headers.authorization || '';
    if (!auth.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const token = auth.split(' ')[1];
   try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  const user = await User.findById(decoded.id);
  if (!user) return res.status(401).json({ error: 'User not found' });
  req.user = user;
  next();
} catch (err) {
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Session expired" });
  }
  return res.status(401).json({ error: "Invalid token" });
}
};

exports.adminRequired = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin only' });
  }
  next();
};
