import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
// value[0].style.color = getRandomHexColor();

let value = document.querySelectorAll('.value');
let days = document.querySelector('span[data-days]');
let hours = document.querySelector('span[data-hours]');
let min = document.querySelector('span[data-minutes]');
let sec = document.querySelector('span[data-seconds]').textContent;
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
            window.alert('Please choose a date in the future');
        };
      console.log(selectedDates[0]);
      options.selectedDate = selectedDates[0];
    },
};

flatpickr ("#datetime-picker", options);

btn.addEventListener('click', onClick);

function onClick() {
   
    const timeToCount = (options.selectedDate.getTime() - options.defaultDate.getTime());
    const countedTime = convertMs(timeToCount);

    const values = Object.values(countedTime);
    const stringValues = addLeadingZero(values);
    
    function addLeadingZero(value) {
        for (let i = 0; i < value.length; i++) {
           value[i] = String(value[i]).padStart(2, '0');
        } 
        return value;
    };
    
    for (let i = 0; i < value.length; i++) {
        value[i].textContent = stringValues[i];
    };

    setInterval(() => {
       if (value[3].textContent === '0') {
        value[3].textContent = 59;
        value[2].textContent--;
       }
       if (value[2].textContent === '0') {
        value[2].textContent = 59;
        value[1].textContent--;
       }
       if (value[1].textContent === '0') {
        value[1].textContent = 24;
        value[0].textContent--;
       }
       value[3].textContent--;
    }, 1000);
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
};