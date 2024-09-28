const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const sandReset = document.getElementById('resetSand');

const width = canvas.width;
const height = canvas.height;

const grid = [];
const colorGrid = []; 

// Initialize the grid and colorGrid arrays
for (let i = 0; i < height; i++) {
    grid[i] = [];
    colorGrid[i] = [];
    for (let j = 0; j < width; j++) {
        grid[i][j] = 0; 
        colorGrid[i][j] = null; 
    }
}

let isDragging = false;

// Draw the grid on the canvas
function drawGrid() {
    ctx.clearRect(0, 0, width, height); 

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (grid[i][j] === 1) {
                ctx.fillStyle = colorGrid[i][j];
                ctx.fillRect(j, i, 1, 1);
            }
        }
    }
}

// Update the grid to simulate the falling sand
function updateGrid() {
    for (let i = height - 2; i >= 0; i--) { 
        for (let j = 0; j < width; j++) {
            if (grid[i][j] === 1 && grid[i + 1][j] === 0) { 
                grid[i + 1][j] = 1; 
                colorGrid[i + 1][j] = colorGrid[i][j]; 
                grid[i][j] = 0; 
                colorGrid[i][j] = null; 
            }
        }
    }
}

// Function to add sand at a specific position
function addSand(x, y) {
    x = Math.round(x);
    y = Math.round(y);

    if (x >= 0 && x < width && y >= 0 && y < height) {
        grid[y][x] = 1; 
        colorGrid[y][x] = `hsl(${(y + x) % 360}, 100%, 50%)`; 
    }
}

// Get mouse or touch position relative to the canvas
function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Handle mouse events
function handleMouseEvent(event) {
    const { x, y } = getMousePosition(event);
    if (isDragging) {
        addSand(x, y);
    }
    event.preventDefault(); // Prevent default behavior to avoid moving the screen
}

// Handle touch events
function handleTouchEvent(event) {
    const touch = event.touches[0];
    const { x, y } = getMousePosition(touch);
    if (isDragging) {
        addSand(x, y);
    }
    event.preventDefault(); // Prevent default behavior to avoid moving the screen
}

// Mouse event listeners
canvas.addEventListener('mousedown', function(event) {
    isDragging = true;
    const { x, y } = getMousePosition(event);
    addSand(x, y);
    event.preventDefault(); // Prevent default behavior
});

canvas.addEventListener('mouseup', function() {
    isDragging = false;
});

canvas.addEventListener('mousemove', handleMouseEvent);

// Touch event listeners
canvas.addEventListener('touchstart', function(event) {
    isDragging = true;
    const touch = event.touches[0];
    const { x, y } = getMousePosition(touch);
    addSand(x, y);
    event.preventDefault(); // Prevent default behavior
});

canvas.addEventListener('touchend', function() {
    isDragging = false;
});

canvas.addEventListener('touchmove', handleTouchEvent);

// Game loop to update and redraw the grid
function gameLoop() {
    updateGrid();
    drawGrid();
    requestAnimationFrame(gameLoop);
}

// Function to reset the canvas and clear the grid
function resetCanvas() {
    // Clear the grid and colorGrid arrays
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            grid[i][j] = 0;
            colorGrid[i][j] = null;
        }
    }

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);
}

// Attach the reset function to the reset button
sandReset.addEventListener('click', resetCanvas);

// Start the game loop
gameLoop();
