import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  getCheckoutSession,
  getAllBookings,
  getBooking,
  updateBooking,
  createBooking,
  deleteBooking,
} from '../controllers/bookingController.js';

export const bookingRouter = express.Router();

bookingRouter.use(protect);

bookingRouter.get('/checkout-session/:tourId', getCheckoutSession);

bookingRouter.use(restrictTo('admin', 'lead-guide'));

bookingRouter.route('/').get(getAllBookings).post(createBooking);

bookingRouter
  .route('/:id')
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);
