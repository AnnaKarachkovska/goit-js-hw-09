import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let value = document.querySelectorAll('.value');

const btn = document.querySelector('button[data-start]');
btn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() > options.defaultDate.getTime()) {
            btn.disabled = false;
        } else {
            btn.disabled = true;
            Notiflix.Notify.failure('Please choose a date in the future');
        };
      options.selectedDate = selectedDates[0];
    },
};
  
flatpickr ("#datetime-picker", options);

btn.addEventListener('click', onClick);

function onClick() {
    btn.disabled = true;

    for (let i = 0; i < value.length; i++) {
        value[i].style.color = getRandomHexColor();
    };
   
    const timerId = setInterval(() => {
        const timeToCount = (options.selectedDate.getTime() - Date.now());
        const countedTime = convertMs(timeToCount);
        const values = Object.values(countedTime);
        
        if(timeToCount < 1000) {
            clearInterval(timerId);
        }

        for (let i = 0; i < value.length; i++) {
            value[i].textContent = values[i];
        };
    }, 1000);
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

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
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// let value = document.querySelectorAll('.field');
// let days = document.querySelector('span[data-days]');
// let hours = document.querySelector('span[data-hours]');
// let minutes = document.querySelector('span[data-minutes]');
// let seconds = document.querySelector('span[data-seconds]');
// const btn = document.querySelector('button[data-start]');
// btn.disabled = true;

// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose(selectedDates) {
//         if (selectedDates[0].getTime() > options.defaultDate.getTime()) {
//             btn.disabled = false;
//         } else {
//             btn.disabled = true;
//             window.alert('Please choose a date in the future');
//         };
//       options.selectedDate = selectedDates[0];
//     },
// };

// flatpickr ("#datetime-picker", options);

// btn.addEventListener('click', onClick);

// function onClick() {
//     btn.disabled = true;
   
//     const timeToCount = (options.selectedDate.getTime() - options.defaultDate.getTime());
//     const countedTime = convertMs(timeToCount);

//     function addLeadingZero(value) {
//         return String(value).padStart(2, '0');
//     };

//     let sec = countedTime.seconds;
//     let min = countedTime.minutes;
//     let hr = countedTime.hours;
//     let dy = countedTime.days;

//     setInterval(() => {
//        if (sec === 00 && min !== 00) {
//         sec = 60;
//         min--;
//        }
//        if (min === 00 && hr !== 00) {
//         min = 60;
//         hr--;
//        }
//        if (hr === 00 && dy !== 00) {
//         hr = 24;
//         dy--;
//        }
//        if (dy === 00) {
//         hr = 24;
//        }
//        min--;

//        days.textContent = addLeadingZero(dy);
//        hours.textContent = addLeadingZero(hr);
//        minutes.textContent = addLeadingZero(min);
//        seconds.textContent = addLeadingZero(sec);

//     }, 1000);

//     for (let i = 0; i < value.length; i++) {
//         value[i].style.color = getRandomHexColor();
//     };
// };

    // const values = Object.values(countedTime);
    // const stringValues = addLeadingZero(values);

    // function addLeadingZero(value) {
    //     for (let i = 0; i < value.length; i++) {
    //        value[i] = String(value[i]).padStart(2, '0');
    //     } 
    //     return value;
    // };
    
    // for (let i = 0; i < value.length; i++) {
    //     value[i].textContent = stringValues[i];
    // };