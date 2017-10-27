const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function drawCircle(context, x, y, r) {
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
    return [d[i], d[i + 1], d[i + 2], d[i + 3]]; // returns array [R,G,B,A]
}

function getPixelXY(x, y) {
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    return getPixel(y * imgData.width + x);
}

function isColored(x, y, color) {
    const pixelColor = getPixelXY(x, y);
    return JSON.stringify(pixelColor) == JSON.stringify(color);
}

function colorPixel(x, y, color) {
    context.fillStyle = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + (color[3] / 255) + ")";
    context.fillRect(x, y, 1, 1);
}

function floodfill(startX, startY, color) {
    let stack = [];
    stack.push({
        x: startX,
        y: startY
    });

    while (stack.length > 0) {
        let currPt = stack.pop();
        if (!isColored(currPt.x, currPt.y, color)) {
            colorPixel(currPt.x, currPt.y, color);
            stack.push({
                x: currPt.x + 1,
                y: currPt.y
            });
            stack.push({
                x: currPt.x,
                y: currPt.y + 1
            });
            stack.push({
                x: currPt.x - 1,
                y: currPt.y
            });
            stack.push({
                x: currPt.x,
                y: currPt.y - 1
            });
        }
    }
}

drawCircle(context, 100, 100, 40);

canvas.addEventListener('click', (event) => {
    const mousePos = getMousePos(canvas, event);
    if (checkHit(context, mousePos.x, mousePos.y, 40)) {
        const color = [64, 255, 125, 255]; //r, g, b ,a
        floodfill(mousePos.x, mousePos.y, color);
    }
});
