import express from 'express';
import MemoryDeleteController from '../Controllers/MemoryDeleteController';
import Gate from '../Gates/Gate';

const MemoryDeleteRouter = express.Router();

MemoryDeleteRouter.delete('/api/v1/memories/:id', Gate.blockInvasion, MemoryDeleteController.deleteMemory);

export default MemoryDeleteRouter;
