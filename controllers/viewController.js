import { Tour } from '../models/tourModel.js';
import { User } from '../models/userModel.js';
import { Booking } from '../models/bookingModel.js';
import catchAsync from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

const getOverview = catchAsync(async (req, res, next) => {
  // 1- Get tour data from collection
  const tours = await Tour.find();
  // 2- Build template

  // 3- Render that template using tour data from step 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});
const getTour = catchAsync(async (req, res, next) => {
  // 1- get the data, for the requested tour (including reviews and tour guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  // 2- build template using data from step 1

  // 3- Render that template using tour data from step 1

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

const getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login into your account',
  });
};

const getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

const getMyTours = catchAsync(async (req, res, next) => {
  // 1- Find all bookings

  const bookings = await Booking.find({ user: req.user.id });

  // 2- Find tours with the returned Ids

  const tourIds = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

const alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

// const updateUserData = catchAsync(async (req, res, next) => {
//   console.log(req.body);
//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email,
//     },
//     {
//       new: true,
//       runValidators: true,
//     },
//   );
//   res.status(200).render('account', {
//     title: 'Your account',
//     user: updatedUser,
//   });
// });

export { getOverview, getTour, getLoginForm, getAccount, getMyTours, alerts };
