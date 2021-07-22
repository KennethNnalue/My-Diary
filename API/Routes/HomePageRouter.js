import HomePageController from "../Controllers/HomePageController";
import express from 'express';
import path from 'path';

const HomepageRouter = express.Router();

HomepageRouter.use(express.static(path.join(__dirname, '..','..', '/UI')));

HomepageRouter.get('/', HomePageController.fetchHomePage);

export default HomepageRouter;
