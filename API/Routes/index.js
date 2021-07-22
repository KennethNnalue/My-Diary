import express from 'express';
import IndexRouter from './indexRouter';
import HomepageRouter from './HomePageRouter';
import AllmemoriesRouters from './AllMemoriesRouters';
import AllMemoriesControllers from '../Controllers/AllMemoriesControllers';


const index = express.Router();
// merge IndexRouter into index
index.use(AllmemoriesRouters, HomepageRouter, IndexRouter,);
export default index;