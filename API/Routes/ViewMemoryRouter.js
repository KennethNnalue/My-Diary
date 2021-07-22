import ViewMemoryController from "../Controllers/ViewMemoryController";
import express from 'express';

const ViewMemoryRouter = express.Router()

ViewMemoryRouter.get('/api/v1/memory', ViewMemoryController.fetchViewMemory);

export default ViewMemoryRouter;