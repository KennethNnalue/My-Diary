import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.PRIVATE_KEY;

const createToken = (userId, lifeSpan = 60 * 60 * 24) => jwt.sign({
  userId
}, secret, {
  expiresIn: lifeSpan
});

export default createToken;
