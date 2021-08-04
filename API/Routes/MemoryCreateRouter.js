import express from 'express';
import MemoryCreateController from '../Controllers/MemoryCreateController';
import Gate from '../Gates/Gate';

const MemoryCreateRouter = express.Router();

MemoryCreateRouter.post('/api/v1/memories', Gate.blockInvasion, MemoryCreateController.createMemory);

export default MemoryCreateRouter;
