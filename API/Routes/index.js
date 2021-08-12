import express from 'express';
import cookieParser from 'cookie-parser';
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
import MemoryUpdatePageRouter from './ViewRouters/MemoryUpdatePageRouter';
import MemoryPageRouter from './ViewRouters/MemoryPageRouter';
import DashBoardPageRouter from './ViewRouters/DashBoardPageRouter';
import MemoryCreatePageRouter from './ViewRouters/MemoryCreatePageRouter';
import SignOutRouter from './SignOutRouter';
import ViewMemoryPageRouter from './ViewRouters/ViewMemoryPageRouter';
import PhotoUploadRouter from './PhotoUploadRouter';

const index = express.Router();

index.use(express.static(path.join(__dirname, '../../Client/assets')));

index.use(express.json());
index.use(cookieParser());
// merge IndexRouter into index
index.use(
  AllmemoriesRouter,
  HomepageRouter,
  LoginPageRouter,
  ViewMemoryRouter,
  IndexRouter,
  MemoryDeleteRouter,
  MemoryCreateRouter,
  MemoryUpdateRouter,
  SignUpRouter,
  SignInRouter,
  SignUpPageRouter,
  MemoryUpdatePageRouter,
  MemoryPageRouter,
  DashBoardPageRouter,
  MemoryCreatePageRouter,
  SignOutRouter,
  MemoryCreatePageRouter,
  ViewMemoryPageRouter,
  PhotoUploadRouter
);

export default index;
