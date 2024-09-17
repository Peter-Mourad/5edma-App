const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateTokens = (user) => {
    const payload = {
        id: user.userID,
        role: user.role
    };

    const access_token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });
    const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    });
    return { access_token: access_token, refresh_token: refresh_token };
};

exports.verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

// Verify Refresh Token
exports.verifyRefreshToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
};