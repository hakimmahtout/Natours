import express from 'express';
import {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  getMyTours,
} from '../controllers/viewController.js';

import { isLoggedIn, protect } from '../controllers/authController.js';

import { createBookingCheckout } from '../controllers/bookingController.js';

export const viewRouter = express.Router();

viewRouter.get('/', createBookingCheckout, isLoggedIn, getOverview);

viewRouter.get('/tour/:slug', isLoggedIn, getTour);

viewRouter.get('/login', isLoggedIn, getLoginForm);

viewRouter.get('/me', protect, getAccount);

viewRouter.get('/my-tours', protect, getMyTours);

// viewRouter.post('/submit-user-data', protect, updateUserData);
