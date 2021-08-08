import express from 'express';
import LoginPageController from '../../Controllers/ViewControllers/LoginPageController';

const LoginPageRouter = express.Router();

LoginPageRouter.get('/login', LoginPageController.fetchLoginPage);

export default LoginPageRouter;
