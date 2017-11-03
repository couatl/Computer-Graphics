const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function drawRect(context, x, y, r) {
    context.beginPath();
    context.rect(x, y, r, r);
    context.lineWidth = 12;
    context.strokeStyle = '#40ff7d';
    context.stroke();
}

function checkHit(context, x, y, r) {
    context.beginPath();
    context.rect(x, y, r, r);
    return context.isPointInPath(x, y);
}

function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function getPixel(index) {
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    let i = index * 4, d = imgData.data;
    return [d[i], d[i + 1], d[i + 2], d[i + 3]];
}

function getPixelXY(x, y) {
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    return getPixel(y * imgData.width + x);
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (let i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function isColored(x, y, color) {
    const pixelColor = getPixelXY(x, y);
    return arraysEqual(pixelColor, color);
}

const id = context.createImageData(1, 1);
let d = id.data;

function colorPixel(x, y, color) {
    d[0] = color[0];
    d[1] = color[1];
    d[2] = color[2];
    d[3] = 255;
    context.putImageData(id, x, y);
}


function floodfill(startX, startY, color) {
    if (!isColored(startX, startY, color)) {
        colorPixel(startX, startY, color);
        floodfill(startX - 1, startY, color);
        floodfill(startX, startY - 1, color);
        floodfill(startX + 1, startY, color);
        floodfill(startX, startY + 1, color);
    }
}

drawRect(context, 100, 100, 40);

canvas.addEventListener('click', (event) => {
    const mousePos = getMousePos(canvas, event);
    if (checkHit(context, mousePos.x, mousePos.y, 40)) {
        const color = [64, 255, 125, 255]; //r, g, b ,a
        floodfill(mousePos.x, mousePos.y, color);
    }
});
