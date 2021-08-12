import express from 'express';
import PhotoUploadController from '../Controllers/PhotoUploadController';

// instantiate router from express
const PhotoUploadRouter = express.Router();

PhotoUploadRouter.post('/api/v1/image/upload', PhotoUploadController.uploadPhoto);

export default PhotoUploadRouter;
