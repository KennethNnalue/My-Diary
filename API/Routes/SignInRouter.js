import express from 'express';
import { checkSchema } from 'express-validator';
import Gate from '../Gates/Gate';
import SignInController from '../Controllers/SignInController';
import signInFormValidationConfig from '../Gates/signInFormValidationConfig';

const SignInRouter = express.Router();

SignInRouter.post('/api/v1/login', checkSchema(signInFormValidationConfig), Gate.collectErrors, SignInController.signIn);

export default SignInRouter;
