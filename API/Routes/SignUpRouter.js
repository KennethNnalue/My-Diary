import express from 'express';
import { body, check, checkSchema } from 'express-validator';
import SignUpController from '../Controllers/SignUpController';
import Gate from '../Gates/Gate';
import signupFormValidationConfig from '../Gates/signupFormValidationConfig';

const SignUpRouter = express.Router();

// Data passes from left to right
SignUpRouter.post('/api/v1/signup', checkSchema(signupFormValidationConfig), Gate.collectErrors, SignUpController.signUp);

export default SignUpRouter;
