/**
 * Created by sharlina on 15.09.17.
 * Задание:
 * Реализовать оператор Собеля для преобразования загружаемого изображения.
 * С помощью оператора Собеля преобразовать исхо..
 */

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const sobelCanvas = document.getElementById('canvas');
const sobelContext = sobelCanvas.getContext('2d');

const downloadButton = document.getElementById('fileDownload');
const sobelButton = document.getElementById('sobel');

downloadButton.addEventListener('click', () => {
    const image = new Image();
    image.src = '../static/img/img.jpg';
    image.addEventListener('load', () => context.drawImage(image, 0, 0));
});

sobelButton.addEventListener('click', () => {
    const image = new Image();
    image.src = '../static/img/img.jpg';
    image.onload = function() {
        const sobel = new Sobel({
            img: image,
            kernel: [
                [ 1, 2, 1],
                [ 0, 0, 0],
                [-1,-2,-1],
            ],
            size: 500
        });
        sobel.calc();
    };
});

function Sobel(options) {
    this.img = options.img;
    this.kernel = options.kernel;
    this.prepareCanvas(this.img, options.size);
}

Sobel.prototype = {
    prepareCanvas: function(element, size) {
        this.img.parentNode.appendChild(sobelCanvas);
        sobelContext.drawImage(element, 0, 0, size, size);
    },
    reduceColor: function() {
        const width = sobelCanvas.width;
        const height = sobelCanvas.height;
        const imageData = sobelContext.getImageData(0, 0, width, height);
        const pixels = imageData.data;

        let r, g, b, value;
        let table = new Array(height);
        for (let j = 0; j < height; j++) {
            table[j] = new Array(width);
        }

        for (let i = 0; i < pixels.length; i+=4) {
            value = Math.floor((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
            table[Math.floor((i / 4) / width)][(i / 4) % width] = value;
        }
        return table;
    },
    calc: function () {
        const width = canvas.width;
        const height = canvas.height;
        const imageData = context.getImageData(0, 0, width, height);
        const pixels = imageData.data;
        const kernel = this.kernel;
        const reducedImage = this.reduceColor();
        const getReducedValue = function(x, y) {
            return (x < 0 || width <= x || y < 0 || height <= y) ? 0: reducedImage[x][y];
        };
        const calcValue = function(x, y) {
            let result = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    result += kernel[i + 1][j + 1] * getReducedValue(x + i, y + j);
                }
            }
            return result;
        };

        for (i = 0; i < pixels.length; i+=4) {
            x = Math.floor((i / 4 / width));
            y = Math.floor((i / 4) % width);
            value = Math.min(calcValue(x, y), 255);
            pixels[i] = value;
            pixels[i+1] = value;
            pixels[i+2] = value;
        }
        sobelContext.putImageData(imageData, 0, 0);
    }
}