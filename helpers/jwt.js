const jwt = require('jsonwebtoken');
let JWT__SECRET = 'jwt_secret';
// Generate JWT token
const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET || JWT__SECRET, {
    expiresIn: '5h' // Token expiration time
  });
  return token;
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || JWT__SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };