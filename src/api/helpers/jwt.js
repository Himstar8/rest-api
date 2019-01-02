import jwt from 'jsonwebtoken';

export default {
  issue(payload, expiresIn) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });
  }
};
