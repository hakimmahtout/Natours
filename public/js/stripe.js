import axios from 'axios';
import { showAlert } from './alerts';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51S5B7XLuEyYfiqFIlRAAE1tiopPTPsHZzycoVDPhZePWfpKaXVGOuXfTgjVQWnRkoutvwoEcxeRvCkUI5vnYkmAu00mFSyoWoA',
);

export const bookTour = async (tourId) => {
  try {
    // 1- Get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    );

    // 2- Create checkout form + charge credit card
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
