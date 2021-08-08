import express from 'express';
import DashBoardController from '../../Controllers/ViewControllers/DashboarBoardController';

const DashBoardRouter = express.Router();

DashBoardRouter.get('/dashboard', DashBoardController.fetchDashBoard);

export default DashBoardRouter;
