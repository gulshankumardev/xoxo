const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET, TOKEN_EXPIRY_TIME } = require('../config');

const createEncryptedPassword = async plainTextPassword => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hash(plainTextPassword, saltRounds);

  return hashedPassword;
};

const createSignedToken = userId => {
  const jwtData = { userId };
  const tokenExpiry = { expiresIn: TOKEN_EXPIRY_TIME };
  return jwt.sign(jwtData, SECRET, tokenExpiry);
};

const validatePassword = async (plainTextPassword, hashedPassword) =>
  bcrypt.compare(plainTextPassword, hashedPassword);

const getUserId = async context => {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');

    const { userId } = jwt.verify(token, SECRET);
    return userId;
  }

  throw new Error('Not Authenticated!');
};

module.exports = {
  createEncryptedPassword,
  createSignedToken,
  validatePassword,
  getUserId,
};
