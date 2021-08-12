import express from 'express';
import Gate from '../../Gates/Gate';
import ViewMemoryPageController from '../../Controllers/ViewControllers/ViewMemoryPageController';
// instantiate router from express
const ViewMemoryPageRouter = express.Router();
ViewMemoryPageRouter.get('/memories/:id', Gate.blockInvasion, ViewMemoryPageController.fetchSingleMemoryPage);

export default ViewMemoryPageRouter;
