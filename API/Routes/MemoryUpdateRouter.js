import express from 'express';
import { checkSchema } from 'express-validator';
import MemoryUpdateController from '../Controllers/MemoryUpdateController';
import Gate from '../Gates/Gate';
import createMemoryGateConfig from '../Gates/createMemoryGateConfig';

// instantiate router from express
const MemoryUpdateRouter = express.Router();

MemoryUpdateRouter.put('/api/v1/memories/:id', Gate.blockInvasion, Gate.blockAccessToAnotherUserResource, checkSchema(createMemoryGateConfig), Gate.collectErrors, MemoryUpdateController.updateMemory);

export default MemoryUpdateRouter;
