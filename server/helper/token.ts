const jwt = require('jsonwebtoken');

const generateToken = (payload: any, expired: string) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired
  });
};
export default generateToken;
