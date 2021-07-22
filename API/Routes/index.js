import express from 'express';
import IndexRouter from './indexRouter';
import HomepageRouter from './HomePageRouter';

const index = express.Router();
// merge IndexRouter into index
index.use(HomepageRouter, IndexRouter);
export default index;