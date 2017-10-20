/**
 * Created by sharlina on 08.09.17.
 */

function saveTextAsFile()
{
    const textToWrite = document.getElementById("inputTextToSave").value;
    const textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    const fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

    const downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

const canvas = document.getElementById("lab02");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ctx = canvas.getContext("2d");
const canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

function drawPixel (x, y, r, g, b, a) {
    let index = (x + y * canvasWidth) * 4;

    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

function loadFileAsText()
{
    const canvas = document.getElementById('lab02');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = "#ffd95a";
    ctx.fillRect(0, 0, 100, 100);
    const log = "/n";

    const fileToLoad = document.getElementById("fileToLoad").files[0];

    const fileReader = new FileReader();
    fileReader.addEventListener('load', fileLoadedEvent =>
    {
        let textFromFileLoaded = fileLoadedEvent.target.result;
        for(let i = 0; i <= 10; i++) {
            for (let j = 0; j <= 10; j++) {
                if(textFromFileLoaded[i + j*10] == 1) {
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(i*10, j*10, 9, 9);
                }
            }
        }
        document.getElementById("inputTextToSave").value = textFromFileLoaded;
    });
    fileReader.readAsText(fileToLoad, "UTF-8");
}
