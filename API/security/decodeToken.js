import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.PRIVATE_KEY;

const decodeToken = (token) => jwt.verify(token, secret);

export default decodeToken;
