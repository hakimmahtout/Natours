import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { dispalyMap } from './mapbox';
import { login, logout } from './login';
import { updateData, updatePassword } from './updateSettings';
import { bookTour } from './stripe';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  dispalyMap(locations);
}
if (loginForm) {
  loginForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}
if (userDataForm) {
  userDataForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateData(form);
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    updatePassword(passwordCurrent, password, passwordConfirm);
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (ev) => {
    ev.target.textContent = 'Processing...';
    const { tourId } = ev.target.dataset;
    bookTour(tourId);
  });
}
