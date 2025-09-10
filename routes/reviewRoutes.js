import express from 'express';
import {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} from '../controllers/reviewController.js';
import {
  protect,
  restrictTo,
  checkAuthor,
} from '../controllers/authController.js';

export const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(protect);

reviewRouter
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

reviewRouter
  .route('/:id')
  .delete(restrictTo('user', 'admin'), checkAuthor, deleteReview)
  .patch(restrictTo('user', 'admin'), checkAuthor, updateReview)
  .get(getReview);
