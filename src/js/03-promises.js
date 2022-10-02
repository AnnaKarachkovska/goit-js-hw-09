import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputArray = document.querySelectorAll('input');

form.addEventListener('submit', onSubmit);

function onSubmit(ev) {
  ev.preventDefault();

  const delay = inputArray[0].value;
  const step = inputArray[1].value;
  const amount = inputArray[2].value;

  for (let i = 1; i <= amount; i++) {
    let promise = null;
    
    if (i === 1) {
      promise = createPromise(i, delay);
    } else {
      const nextDelay = (i - 1) * step + Number(delay);
      promise = createPromise(i, nextDelay);
    }

    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  };
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });
};