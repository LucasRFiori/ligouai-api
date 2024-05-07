import { Router } from 'express';
import PhoneController from './modules/Controllers/PhoneController';
import CommentController from './modules/Controllers/CommentController';
import AdminAuthValidator from './middlewares/AuthValidator';
import Ipv4 from './middlewares/Ipv4';
import CreatePhoneDto from './dto/create-phone-dto';
import CreateCommentDto from './dto/create-comment-dto';
import findbyPhoneDto from './dto/findby-phone-dto';
import MountVersionString from './utils/MountVersionString';
import { RateLimit } from './middlewares/RateLimit';

declare module 'express' {
  interface Request {
    authToken?: string;
    clientIp?: string;
  }
}

export const router = Router();

//RECENT COMMENTS
router.get(
  MountVersionString.mount('comment/recent'),
  Ipv4.handle,
  RateLimit({ limit: 20, windowMs: 5 * 60 * 1000 }),
  CommentController.recent,
);

//FIND PHONE
router.get(
  MountVersionString.mount('phone/:phone'),
  Ipv4.handle,
  RateLimit({ limit: 20, windowMs: 5 * 60 * 1000 }),
  findbyPhoneDto.validate,
  PhoneController.findByPhone,
);

//ADMIN ROUTES
router.get(MountVersionString.mount('phone/all'), AdminAuthValidator.validate, PhoneController.index);
router.get(MountVersionString.mount('comment/all'), AdminAuthValidator.validate, CommentController.index);

//CREATE PHONE
router.post(
  MountVersionString.mount('phone/create'),
  Ipv4.handle,
  RateLimit({ limit: 20, windowMs: 5 * 60 * 1000 }),
  CreatePhoneDto.validate,
  PhoneController.store,
);

//CREATE COMMENT
router.post(
  MountVersionString.mount('comment/create'),
  Ipv4.handle,
  RateLimit({ limit: 20, windowMs: 5 * 60 * 1000 }),
  CreateCommentDto.validate,
  CommentController.store,
);
