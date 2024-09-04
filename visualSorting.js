const sortCanvas = document.getElementById('sortCanvas');
const sortCtx = canvas.getContext('2d');

const sortWidth = canvas.width;
const sortHeight = canvas.height;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

console.log(getRandomInt(5));