import express from 'express';
import MemoryChangePageController from '../../Controllers/ViewControllers/MemoryChangePageController';

const MemoryChangePageRouter = express.Router();

MemoryChangePageRouter.get('/memorychange', MemoryChangePageController.fetchMemoryChangePage);

export default MemoryChangePageRouter;
