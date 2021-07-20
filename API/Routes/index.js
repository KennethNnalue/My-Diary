import express from 'express';
import IndexRouter from './indexRouter';
const index = express.Router();
// merge IndexRouter into index
index.use(IndexRouter);
export default index;