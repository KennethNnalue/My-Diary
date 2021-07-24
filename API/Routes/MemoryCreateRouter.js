import MemoryCreateController from '../Controllers/MemoryCreateController';
import express from 'express';

const MemoryCreateRouter = express.Router();

MemoryCreateRouter.post('/api/v1/memories', MemoryCreateController.createMemory);

export default MemoryCreateRouter;