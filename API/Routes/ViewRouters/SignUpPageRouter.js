import express from 'express';
import SignUpPageController from '../../Controllers/ViewControllers/SignUpPageController';

const SignUpPageRouter = express.Router();

SignUpPageRouter.get('/signup', SignUpPageController.fetchSignUpPage);

export default SignUpPageRouter;
