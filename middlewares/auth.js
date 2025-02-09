// middlewares/auth.js
const jwt = require('jsonwebtoken');

// List of public routes that do not require authentication
const publicRoutes = ['/auth/register', '/auth/login', '/mega-top'];

module.exports = async function (request, reply) {
  // If the request URL is public, skip authentication
  if (publicRoutes.includes(request.raw.url)) {
    return;
  }
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    reply.code(401).send({ message: 'Token not provided' });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secret'); // Replace 'secret' with an environment variable in production
    request.userId = decoded.id;
  } catch (err) {
    reply.code(401).send({ message: 'Invalid token' });
  }
};
