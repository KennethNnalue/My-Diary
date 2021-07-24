import express from 'express';
import IndexRouter from './indexRouter';
import HomepageRouter from './HomePageRouter';
import AllmemoriesRouter from './AllMemoriesRouter';
import ViewMemoryRouter from './ViewMemoryRouter';
import MemoryDeleteRouter from './MemoryDeleteRouter';
import MemoryCreateRouter from './MemoryCreateRouter';

const index = express.Router();

index.use(express.json());
// merge IndexRouter into index
index.use(AllmemoriesRouter, HomepageRouter,ViewMemoryRouter, 
IndexRouter, MemoryDeleteRouter, MemoryCreateRouter);

export default index;