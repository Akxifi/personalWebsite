const sortCanvas = document.getElementById('sortCanvas');
const sortCtx = sortCanvas.getContext('2d');
const resetButton = document.getElementById('resetSort');

const sortWidth = sortCanvas.width;
const sortHeight = sortCanvas.height;
let lineLengths = [];
let sortingInProgress = false;


function initializeLines() {
    lineLengths = []; 
    sortCtx.clearRect(0, 0, sortCanvas.width, sortCanvas.height);

    for (let i = 0; i < 266; i++) {
        lineLengths.push(getRandomInt(sortCanvas.height));
    }
    drawLines();
}


function drawLines() {

    sortCtx.clearRect(0, 0, sortCanvas.width, sortCanvas.height);

    let startX = 1;
    const startY = sortCanvas.height + 1;
    const lineSpacing = 3;

    lineLengths.forEach((length) => {
        sortCtx.beginPath();
        sortCtx.moveTo(startX, startY);
        sortCtx.lineTo(startX, startY - length);
        sortCtx.strokeStyle = 'white';
        sortCtx.lineWidth = 0;
        sortCtx.stroke();

        startX += lineSpacing;
    });
}

function bubbleSort() {
    if (sortingInProgress) return;
    sortingInProgress = true; 

    let n = lineLengths.length;
    let swapped;
    let delay = 1; 

    function sortStep(i, end) {
        if (i < end - 1) {
            if (lineLengths[i] > lineLengths[i + 1]) {

                const temp = lineLengths[i];
                lineLengths[i] = lineLengths[i + 1];
                lineLengths[i + 1] = temp;
                swapped = true;
            }

            
            drawLines();

            
            setTimeout(() => sortStep(i + 1, end), delay);
        } else if (swapped) {
            
            swapped = false;
            setTimeout(() => sortStep(0, end - 1), delay);
        } else {
            sortingInProgress = false;
        }
    }

    
    sortStep(0, n);
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function reset() {
    if (sortingInProgress) {
        sortingInProgress = false; 
    }
    initializeLines(); 
    bubbleSort(); 
}

// Attach the reset function to the reset button
resetButton.addEventListener('click', reset);


initializeLines();
bubbleSort();
