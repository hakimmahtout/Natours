import { Tour } from '../models/tourModel.js';
import { Booking } from '../models/bookingModel.js';
import catchAsync from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';
import Stripe from 'stripe';
import {
  deleteOne,
  createOne,
  updateOne,
  getOne,
  getAll,
} from './handlerFactory.js';
import { User } from '../models/userModel.js';

const getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1- Get currently booked tour
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const tour = await Tour.findById(req.params.tourId);

  if (!tour) {
    return next(new AppError('', 404));
  }

  // 2- Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    // success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get('host')}/my-tours`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          },
        },
      },
    ],
  });

  // 3- Create session as response

  res.status(200).json({
    status: 'success',
    session,
  });
});

// const createBookingCheckout = catchAsync(async (req, res, next) => {
//   // This is only temporary, because it's unsecure: everyone can make bookings without paying
//   const { tour, user, price } = req.query;

//   if (!tour && !user && !price) {
//     return next();
//   }

//   await Booking.create({
//     tour,
//     user,
//     price,
//   });

//   res.redirect(req.originalUrl.split('?')[0]);
// });

const createBookingCheckout = async (session) => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.line_items[0].price_data.unit_amount / 100;
  await Booking.create({
    tour,
    user,
    price,
  });
};

const webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature.process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }
  if (event.type === 'checkout.session.completed') {
    return createBookingCheckout(event.data.object);
  }

  res.status(200).json({
    received: true,
  });
};

const createBooking = createOne(Booking);
const getBooking = getOne(Booking);
const updateBooking = updateOne(Booking);
const deleteBooking = deleteOne(Booking);
const getAllBookings = getAll(Booking);

export {
  getCheckoutSession,
  createBookingCheckout,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  getAllBookings,
  webhookCheckout,
};
