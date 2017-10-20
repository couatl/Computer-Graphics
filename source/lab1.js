const canvas = document.getElementById('lab01');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "#ffd95a";
ctx.fillRect(10, 10, 100, 100);
flag = false;
canvas.addEventListener("mousemove", function (event) {
    if (flag) {
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(event.offsetX, event.offsetY, 2, 2);
        ctx.closePath();
    }
});
canvas.addEventListener("mousedown", function (e) {
    flag = true;
});
canvas.addEventListener("mouseup", function (e) {
    flag = false;
});