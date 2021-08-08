import express from 'express';
import MemoryPageController from '../../Controllers/ViewControllers/MemoryPageController';

const MemoryPageRouter = express.Router();

MemoryPageRouter.get('/memory', MemoryPageController.fetchMemoryPage);

export default MemoryPageRouter;
