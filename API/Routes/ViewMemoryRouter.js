import express from 'express';
import ViewMemoryController from '../Controllers/ViewMemoryController';

const ViewMemoryRouter = express.Router();

ViewMemoryRouter.get('/api/v1/memories/:id', ViewMemoryController.fetchViewMemory);

export default ViewMemoryRouter;
