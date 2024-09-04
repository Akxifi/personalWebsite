const sortCanvas = document.getElementById('sortCanvas');
const sortCtx = sortCanvas.getContext('2d');

const sortWidth = sortCanvas.width;
const sortHeight = sortCanvas.height;
const lineLengths = [];

for (var i = 0; i<132; i++){
    lineLengths.push(getRandomInt(sortCanvas.height));
}

let startX = 1;
const startY = sortCanvas.height + 1;
const lineSpacing = 1;

lineLengths.forEach((length) =>{
    sortCtx.beginPath();
    sortCtx.moveTo(startX, startY);
    sortCtx.lineTo(startX, startY - length);
    sortCtx.strokeStyle = 'white';
    sortCtx.lineWidth = 0;
    sortCtx.stroke();

    startX += lineSpacing;
});

function bubbleSort() {
    let n = lineLengths.length;
    let swapped;
    let delay = 10; // Adjust the delay (in milliseconds) for visualization speed

    function drawLines() {
        // Clear the canvas before redrawing
        sortCtx.clearRect(0, 0, sortCanvas.width, sortCanvas.height);

        let startX = 1;
        const startY = sortCanvas.height + 1;
        const lineSpacing = 3;

        // Redraw the lines based on current lineLengths
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

    function sortStep(i, end) {
        if (i < end - 1) {
            if (lineLengths[i] > lineLengths[i + 1]) {
                // Swap elements
                const temp = lineLengths[i];
                lineLengths[i] = lineLengths[i + 1];
                lineLengths[i + 1] = temp;
                swapped = true;
            }

            // Redraw the canvas after each step
            drawLines();

            // Schedule the next step
            setTimeout(() => sortStep(i + 1, end), delay);
        } else if (swapped) {
            // If any swaps were made, start a new pass
            swapped = false;
            setTimeout(() => sortStep(0, end - 1), delay);
        }
    }

    // Start the first sorting step
    sortStep(0, n);
}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

bubbleSort();