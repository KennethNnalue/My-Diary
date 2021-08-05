import express from 'express';
import Gate from '../Gates/Gate';
import ViewMemoryController from '../Controllers/ViewMemoryController';

const ViewMemoryRouter = express.Router();

ViewMemoryRouter.get('/api/v1/memories/:id', Gate.blockInvasion, Gate.blockAccessToAnotherUserResource, ViewMemoryController.fetchViewMemory);

export default ViewMemoryRouter;
