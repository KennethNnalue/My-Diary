import AllMemoriesController from "../Controllers/AllMemoriesController";
import express from 'express';

const AllmemoriesRouter = express.Router()

AllmemoriesRouter.get('/api/v1/memories', AllMemoriesController.fetchAllMemories);

export default AllmemoriesRouter;
