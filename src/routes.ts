import { Router } from 'express';
import PhoneController from './modules/Controllers/PhoneController';
import CommentController from './modules/Controllers/CommentController';
import AdminAuthValidator from './middlewares/AuthValidator';
import Ipv4 from './middlewares/Ipv4';
import CreatePhoneDto from './dto/create-phone-dto';
import CreateCommentDto from './dto/create-comment-dto';
import findbyPhoneDto from './dto/findby-phone-dto';
import MountVersionString from './utils/MountVersionString';

declare module 'express' {
  interface Request {
    authToken?: string;
    clientIp?: string;
  }
}

export const router = Router();

//GET
router.get(MountVersionString.mount('phone/all'), AdminAuthValidator.validate, PhoneController.index);
router.get(MountVersionString.mount('comment/all'), AdminAuthValidator.validate, CommentController.index);
router.get(MountVersionString.mount('comment/recent'), CommentController.recent);
router.get(MountVersionString.mount('phone/:phone'), findbyPhoneDto.validate, PhoneController.findByPhone);

//POST
router.post(MountVersionString.mount('phone/create'), CreatePhoneDto.validate, PhoneController.store);
router.post(
  MountVersionString.mount('comment/create'),
  Ipv4.handle,
  CreateCommentDto.validate,
  CommentController.store,
);
