import express from 'express';
import MemoryCreatePageController from '../../Controllers/ViewControllers/MemoryCreatePageController';
import Gate from '../../Gates/Gate';

// instantiate router from express
const MemoryCreatePageRouter = express.Router();
MemoryCreatePageRouter.get('/memorycreate', Gate.blockInvasion, MemoryCreatePageController.fetchMemoryCreatePage);

export default MemoryCreatePageRouter;
