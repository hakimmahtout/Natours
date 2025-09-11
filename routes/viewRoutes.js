import express from 'express';
import {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  getMyTours,
  alerts,
} from '../controllers/viewController.js';

import { isLoggedIn, protect } from '../controllers/authController.js';

export const viewRouter = express.Router();

viewRouter.set(alerts);

viewRouter.get('/', isLoggedIn, getOverview);

viewRouter.get('/tour/:slug', isLoggedIn, getTour);

viewRouter.get('/login', isLoggedIn, getLoginForm);

viewRouter.get('/me', protect, getAccount);

viewRouter.get('/my-tours', protect, getMyTours);

// viewRouter.post('/submit-user-data', protect, updateUserData);
