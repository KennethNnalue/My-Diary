import express from 'express';
import HomePageController from '../../Controllers/ViewControllers/HomePageController';

const HomepageRouter = express.Router();

HomepageRouter.get('/', HomePageController.fetchHomePage);

export default HomepageRouter;
