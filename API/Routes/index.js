import express from 'express';
import IndexRouter from './indexRouter';
import HomepageRouter from './HomePageRouter';
import AllmemoriesRouters from './AllMemoriesRouters';
import AllMemoriesControllers from '../Controllers/AllMemoriesControllers';
import ViewMemoryController from '../Controllers/ViewMemoryController';
import ViewMemoryRouter from './ViewMemoryRouter';

const index = express.Router();

// merge IndexRouter into index
index.use(AllmemoriesRouters, HomepageRouter,ViewMemoryRouter, IndexRouter,);

export default index;