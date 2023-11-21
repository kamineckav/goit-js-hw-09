import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  body: document.querySelector('body'),
};

refs.btn.addEventListener('click', onClick);
let currentDay = null;
let futureDay = null;
let id = null;
let time = 0;
refs.btn.setAttribute('disabled', 'true');

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    futureDay = selectedDates[0].getTime();
    currentDay = new Date();
    if (futureDay - currentDay < 1000) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btn.removeAttribute('disabled');
      Notiflix.Notify.info('You choose a date');
    }
  },
});

function onClick() {
  id = setInterval(() => {
    currentDay = new Date().getTime();
    if (futureDay - currentDay < 1000) {
      Notiflix.Notify.success('The time is up!');
      clearInterval(id);
    } else {
      currentDay += 1000;
      time = futureDay - currentDay;

      convertMs(time);
    }
  }, 1000);
  refs.btn.setAttribute('disabled', 'true');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  newValue({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

function newValue({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
