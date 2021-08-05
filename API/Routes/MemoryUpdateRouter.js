import express from 'express';
import MemoryUpdateController from '../Controllers/MemoryUpdateController';
import Gate from '../Gates/Gate';

// instantiate router from express
const MemoryUpdateRouter = express.Router();

MemoryUpdateRouter.put('/api/v1/memories/:id', Gate.blockInvasion, Gate.blockAccessToAnotherUserResource, MemoryUpdateController.updateMemory);

export default MemoryUpdateRouter;
