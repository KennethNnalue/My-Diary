import ViewMemoryController from "../Controllers/ViewMemoryController";
import express from 'express';

const ViewMemoryRouter = express.Router()

ViewMemoryRouter.get('/api/v1/memory', ViewMemoryController.FetchViewMemoryPage);

export default ViewMemoryRouter;