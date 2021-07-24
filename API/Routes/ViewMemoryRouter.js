import ViewMemoryController from "../Controllers/ViewMemoryController";
import express from 'express';

const ViewMemoryRouter = express.Router()

ViewMemoryRouter.get('/api/v1/memories/:id', ViewMemoryController.fetchViewMemory);

export default ViewMemoryRouter;