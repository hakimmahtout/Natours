import express from 'express';
import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} from '../controllers/authController.js';
import {
  getAllUsers,
  updateMe,
  deleteMe,
  getMe,
  deleteUser,
  updateUser,
  getUser,
  uploadUserPhoto,
  resizeUserPhoto,
} from '../controllers/userControler.js';

export const userRouter = express.Router();

userRouter.route('/signup').post(signup);

userRouter.route('/login').post(login);

userRouter.route('/logout').get(logout);

userRouter.route('/forgotPassword').post(forgotPassword);

userRouter.route('/resetPassword/:token').patch(resetPassword);

// Protect all routes after this middleware
userRouter.use(protect);

userRouter.route('/updateMyPassword').patch(updatePassword);

userRouter.route('/me').get(getMe, getUser);

userRouter.route('/updateMe').patch(uploadUserPhoto, resizeUserPhoto, updateMe);

userRouter.route('/deleteMe').delete(deleteMe);

userRouter.use(restrictTo('admin'));

userRouter.route('/').get(getAllUsers);

userRouter.route('/:id').delete(deleteUser).patch(updateUser).get(getUser);
