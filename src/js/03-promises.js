import Notiflix from 'notiflix';

const form = document.querySelector('.form');
let delay = 0;
let step = 0;
let amount = 0;
let currentDelay = 0;
let i = 0;
let timer;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  delay = Number(form.elements.delay.value);
  step = Number(form.elements.step.value);
  amount = Number(form.elements.amount.value);

  for (i = 1; i <= amount; i += 1) {
    currentDelay = delay + (i - 1) * step;

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    timer = setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay)
  })
}