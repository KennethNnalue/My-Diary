import express from 'express';
import SignOutController from '../Controllers/SignOutController';

// instantiate router from express
const SignOutRouter = express.Router();

SignOutRouter.get('/signout', SignOutController.signOut);

export default SignOutRouter;
