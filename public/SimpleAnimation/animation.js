const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const fish = new Image();
fish.src = '../static/img/fish.png';
fish.centerX = 350;
fish.centerY = 250;
fish.posX = 400;
fish.posY = 250;
fish.angle = 0;

const radius = 50;
const speedFish = 0.05;

const dashLen = 220;
speed = 10;
const txt = 'Computer Graphics';
let x = 30, i = 0;
let dashOffset = dashLen;

context.font = '72px Allura';
context.lineWidth = 4;
context.lineJoin = 'round';
// Transparency!
context.globalAlpha = 2 / 3;
context.strokeStyle = context.fillStyle = '#90291c';

context.drawImage(fish, fish.posX, fish.posY);

canvas.addEventListener('click', event => {
    const endX = fish.posX + fish.width;
    const endY = fish.posY + fish.height;
    const mousePos = getMousePos(canvas, event);

    if (fish.animating) {
        fish.animating = false;
        return;
    }
    else if ( (mousePos.x > fish.posX && mousePos.y > fish.posY) &&
        ((mousePos.x < endX && mousePos.y < endY))) {
        fish.animating = true;
        drawFish();
    }
});

loop();

function drawFish() {
    context.clearRect(fish.posX, fish.posY, fish.width, fish.height);

    fish.posX = fish.centerX + Math.cos(fish.angle) * radius;
    fish.posY = fish.centerY + Math.sin(fish.angle) * radius;

    fish.angle += speedFish;
    context.drawImage(fish, fish.posX, fish.posY);
    if (fish.animating)
        requestAnimationFrame(drawFish);
}

function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function loop() {
    context.setLineDash([dashLen - dashOffset, dashOffset - speed]);
    dashOffset -= speed;
    context.strokeText(txt[i], x, 90);

    if (dashOffset > 0) {
        requestAnimationFrame(loop);
    }
    else {
        context.fillText(txt[i], x, 90);
        dashOffset = dashLen;
        x += context.measureText(txt[i++]).width + context.lineWidth + 3 * Math.random();
        context.setTransform(1, 0, 0, 1, 0, 3 * Math.random());
        context.rotate(Math.random() * 0.005);
        if (i < txt.length) {
            requestAnimationFrame(loop);
        }
    }
}