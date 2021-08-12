import express from 'express';
import DashBoardPageController from '../../Controllers/ViewControllers/DashboarBoardPageController';
import Gate from '../../Gates/Gate';

const DashBoardPageRouter = express.Router();

DashBoardPageRouter.get('/dashboard', Gate.blockInvasion, DashBoardPageController.fetchDashBoardPage);

export default DashBoardPageRouter;
