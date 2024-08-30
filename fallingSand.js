var button = document.getElementById("myButton");
button.addEventListener("click", changeFont);

function changeFont(){
    document.getElementById("testing").style.fontFamily = "Times New Roman";
}

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const container = document.getElementById('canvas-container');
container.appendChild(canvas);

return canvas.getContext('2d');

document.addEventListener("DOMContentLoaded", ()=> {
    const ctx = createCanvas(400, 400);
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 100, 100);
});