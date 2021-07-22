import AllMemoriesControllers from "../Controllers/AllMemoriesControllers";
import express from 'express';
import path from 'path';

const AllmemoriesRouters = express.Router()

AllmemoriesRouters.use(express.static(path.join(__dirname,'../../UI')));

AllmemoriesRouters.get('/api/v1/memories', AllMemoriesControllers.FetchAllMemoriesPage);

export default AllmemoriesRouters;
