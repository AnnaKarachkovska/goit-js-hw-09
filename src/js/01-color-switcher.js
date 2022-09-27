function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let colorChange = null;

const onClick = () => {
    colorChange = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnStart.disabled = true;
    btnStop.disabled = false;
};

btnStart.addEventListener('click', onClick);

btnStop.addEventListener('click', () => {
    clearInterval(colorChange);
    btnStart.disabled = false;
    btnStop.disabled = true;
});