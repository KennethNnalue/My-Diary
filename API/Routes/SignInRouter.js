import express from 'express';
import SignInController from '../Controllers/SignInController';

const SignInRouter = express.Router();

SignInRouter.post('/api/v1/signin', SignInController.signIn);

export default SignInRouter;
