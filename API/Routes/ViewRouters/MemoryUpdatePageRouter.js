import express from 'express';
import MemoryUpdatePageController from '../../Controllers/ViewControllers/MemoryUpdatePageController';

const MemoryUpdatePageRouter = express.Router();

MemoryUpdatePageRouter.get('/memory/update/:id', MemoryUpdatePageController.fetchMemoryUpdatePage);

export default MemoryUpdatePageRouter;
