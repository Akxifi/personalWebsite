const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const grid = [];
const colorGrid = []; // Array to store colors for each sand particle

for (let i = 0; i < height; i++) {
    grid[i] = [];
    colorGrid[i] = [];
    for (let j = 0; j < width; j++) {
        grid[i][j] = 0; // 0 represents an empty cell, 1 represents sand
        colorGrid[i][j] = null; // To store color of sand
    }
}

let isDragging = false;

function drawGrid() {
    ctx.clearRect(0, 0, width, height); // Clear the canvas

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (grid[i][j] === 1) {
                ctx.fillStyle = colorGrid[i][j];
                ctx.fillRect(j, i, 1, 1); // Draw a single pixel of sand
            }
        }
    }
}

function updateGrid() {
    for (let i = height - 2; i >= 0; i--) { // Start from the second-last row
        for (let j = 0; j < width; j++) {
            if (grid[i][j] === 1 && grid[i + 1][j] === 0) { // If there's sand and the cell below is empty
                grid[i + 1][j] = 1; // Move the sand down
                colorGrid[i + 1][j] = colorGrid[i][j]; // Move the color down
                grid[i][j] = 0; // Empty the current cell
                colorGrid[i][j] = null; // Clear the color
            }
        }
    }
}

function addSand(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (x >= 0 && x < width && y >= 0 && y < height) {
        grid[y][x] = 1; // Add sand at the mouse position
        colorGrid[y][x] = `hsl(${(y + x) % 360}, 100%, 50%)`; // Calculate color based on position
    }
}

canvas.addEventListener('mousedown', function(event) {
    isDragging = true;
    addSand(event);
});

canvas.addEventListener('mouseup', function() {
    isDragging = false;
});

canvas.addEventListener('mousemove', function(event) {
    if (isDragging) {
        addSand(event);
    }
});

function gameLoop() {
    updateGrid();
    drawGrid();
    requestAnimationFrame(gameLoop); // Keep the loop going
}

gameLoop(); // Start the game loop
