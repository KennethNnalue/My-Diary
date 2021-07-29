import express from 'express';
import SignUpController from '../Controllers/SignUpController';

const SignUpRouter = express.Router();

SignUpRouter.post('/api/v1/signup', SignUpController.signUp);

export default SignUpRouter;
