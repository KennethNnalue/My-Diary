import express from 'express';
import IndexRouter from './indexRouter';
import HomepageRouter from './HomePageRouter';
import AllmemoriesRouter from './AllMemoriesRouter';
import ViewMemoryRouter from './ViewMemoryRouter';

const index = express.Router();

// merge IndexRouter into index
index.use(AllmemoriesRouter, HomepageRouter,ViewMemoryRouter, IndexRouter);

export default index;