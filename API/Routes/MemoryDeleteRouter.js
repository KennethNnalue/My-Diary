import MemoryDeleteController from '../Controllers/MemoryDeleteController';
import express from 'express';

const MemoryDeleteRouter = express.Router();

MemoryDeleteRouter.delete('/api/v1/memories/:id', MemoryDeleteController.deleteMemory);

export default MemoryDeleteRouter;
