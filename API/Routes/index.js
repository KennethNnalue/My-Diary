import express from 'express';
import path from 'path';
import IndexRouter from './IndexRouter';
import HomepageRouter from './ViewRouters/HomePageRouter';
import AllmemoriesRouter from './AllMemoriesRouter';
import ViewMemoryRouter from './ViewMemoryRouter';
import MemoryDeleteRouter from './MemoryDeleteRouter';
import MemoryCreateRouter from './MemoryCreateRouter';
import MemoryUpdateRouter from './MemoryUpdateRouter';
import SignUpRouter from './SignUpRouter';
import SignInRouter from './SignInRouter';
import LoginPageRouter from './ViewRouters/LoginPageRouter';
import SignUpPageRouter from './ViewRouters/SignUpPageRouter';
import MemoryChangePageRouter from './ViewRouters/MemoryChangePageRouter';
import MemoryPageRouter from './ViewRouters/MemoryPageRouter';
import DashBoardRouter from './ViewRouters/DashBoardRouter';

const index = express.Router();

index.use(express.static(path.join(__dirname, '../../Client/assets')));

index.use(express.json());
// merge IndexRouter into index
index.use(AllmemoriesRouter, HomepageRouter, LoginPageRouter, ViewMemoryRouter,
  IndexRouter, MemoryDeleteRouter, MemoryCreateRouter, MemoryUpdateRouter,
  SignUpRouter, SignInRouter, SignUpPageRouter, MemoryChangePageRouter,
  MemoryPageRouter, DashBoardRouter);

export default index;
