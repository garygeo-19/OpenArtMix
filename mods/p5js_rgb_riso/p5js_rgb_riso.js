//based on https://antiboredom.github.io/p5.riso/#channel and https://www.openprocessing.org/sketch/735496



let red, reds, redCheckbox, redXSlider, redYSlider, redScaleSlider;
let green, greens, greenCheckbox, greenXSlider, greenYSlider, greenScaleSlider;
let blue, blues, blueCheckbox, blueXSlider, blueYSlider, blueScaleSlider;
let purple, purples, purpleCheckbox, purpleXSlider, purpleYSlider, purpleScaleSlider;
let teal, teals, tealCheckbox, tealXSlider, tealYSlider, tealScaleSlider;

let canvasCapture, canvasCaptureWidth, canvasCaptureHeight;
let cnv, button;
let scaleSliderMax;
var refreshNeeded;



function preload() {
    canvasCapture = loadImage("Transfer-an-Image.png");


}



function setup() {
    pixelDensity(2);
    refreshNeeded = false;
    scaleSliderMax = 4;

    cnv = createCanvas(500, 500);
    cnv.id('frameCanvasOut');


    //red
    red = new Riso("red", width, height);
    redCheckbox = createCheckbox("Red", false);
    redCheckbox.changed(updateRiso);
    createElement('label', 'X:');
    redXSlider = createSlider(-1 * width, width, 0, 1);
    redXSlider.input(updateRiso);
    createElement('label', 'Y:');
    redYSlider = createSlider(-1 * height, height, 0, 1);
    redYSlider.input(updateRiso);
    createElement('label', 'Scale:');
    redScaleSlider = createSlider(.1, scaleSliderMax, 2, .1);
    redScaleSlider.input(updateRiso);
    //green
    green = new Riso("green", width, height);
    greenCheckbox = createCheckbox("Green", false);
    greenCheckbox.changed(updateRiso);
    createElement('label', 'X:');
    greenXSlider = createSlider(-1 * width, width, 0, 1);
    greenXSlider.input(updateRiso);
    createElement('label', 'Y:');
    greenYSlider = createSlider(-1 * height, height, 0, 1);
    greenYSlider.input(updateRiso);
    createElement('label', 'Scale:');
    greenScaleSlider = createSlider(.1, scaleSliderMax, 2, .1);
    greenScaleSlider.input(updateRiso);
    //blue
    blue = new Riso("blue", width, height);
    blueCheckbox = createCheckbox("Blue", false);
    blueCheckbox.changed(updateRiso);
    createElement('label', 'X:');
    blueXSlider = createSlider(-1 * width, width, 0, 1);
    blueXSlider.input(updateRiso);
    createElement('label', 'Y:');
    blueYSlider = createSlider(-1 * height, height, 0, 1);
    blueYSlider.input(updateRiso);
    createElement('label', 'Scale:');
    blueScaleSlider = createSlider(.1, scaleSliderMax, 2, .1);
    blueScaleSlider.input(updateRiso);
    //purple
    purple = new Riso("purple", width, height);
    purpleCheckbox = createCheckbox("Purple", false);
    purpleCheckbox.changed(updateRiso);
    createElement('label', 'X:');
    purpleXSlider = createSlider(-1 * width, width, 0, 1);
    purpleXSlider.input(updateRiso);
    createElement('label', 'Y:');
    purpleYSlider = createSlider(-1 * height, height, 0, 1);
    purpleYSlider.input(updateRiso);
    createElement('label', 'Scale:');
    purpleScaleSlider = createSlider(.1, scaleSliderMax, 2, .1);
    purpleScaleSlider.input(updateRiso);
    //teal
    teal = new Riso("teal", width, height);
    tealCheckbox = createCheckbox("Teal", false);
    tealCheckbox.changed(updateRiso);
    createElement('label', 'X:');
    tealXSlider = createSlider(-1 * width, width, 0, 1);
    tealXSlider.input(updateRiso);
    createElement('label', 'Y:');
    tealYSlider = createSlider(-1 * height, height, 0, 1);
    tealYSlider.input(updateRiso);
    createElement('label', 'Scale:');
    tealScaleSlider = createSlider(.1, scaleSliderMax, 2, .1);
    tealScaleSlider.input(updateRiso);

    reds = extractRGBChannel(canvasCapture, 0);
    greens = extractRGBChannel(canvasCapture, 1);
    blues = extractRGBChannel(canvasCapture, 2);
    purples = extractRGBChannel(canvasCapture, 0);
    teals = extractRGBChannel(canvasCapture, 2);
    image(canvasCapture, 0, 0, canvasCapture.width, canvasCapture.height);
    parent.postMessage('updateSize');
}

function loadCanvasImage() {
    console.log("loadCanvas Started");
    let importCanvas = document.getElementById("frameCanvasIn");
    canvasCapture = loadImage(importCanvas.toDataURL('image/png'), function () {
        canvasCapture.width = importCanvas.width;
        canvasCapture.height = importCanvas.height;
        refreshNeeded = false;
        console.log("canvasCapture Details");
        resizeCanvas(importCanvas.width, importCanvas.height);
        canvasCaptureWidth = canvasCapture.width / 2;
        canvasCaptureHeight = canvasCapture.height / 2;
        image(canvasCapture, 0, 0, canvasCapture.width, canvasCapture.height);
        console.log("loadCanvas Ended");
        updateRiso();
    });
}

function draw() {

    if (refreshNeeded) {
        console.log(refreshNeeded);
        loadCanvasImage();
        parent.postMessage('updateSize');
    }
}

function updateRiso() {

    if (redCheckbox.checked() == false && greenCheckbox.checked() == false && blueCheckbox.checked() == false && purpleCheckbox.checked() == false && tealCheckbox.checked() == false) {
        image(canvasCapture, 0, 0, canvasCapture.width, canvasCapture.height);
    } else {

        reds = extractRGBChannel(canvasCapture, 0);
        greens = extractRGBChannel(canvasCapture, 1);
        blues = extractRGBChannel(canvasCapture, 2);
        purples = extractRGBChannel(canvasCapture, 0);
        teals = extractRGBChannel(canvasCapture, 2);
        background(255);
        clearRiso();


        //red
        if (redCheckbox.checked()) {
            red.image(reds, 0 + redXSlider.value(), 0 + redYSlider.value(), canvasCaptureWidth * redScaleSlider.value(), canvasCaptureHeight * redScaleSlider.value());
        }
        //green
        if (greenCheckbox.checked()) {
            green.image(greens, 0 + greenXSlider.value(), 0 + greenYSlider.value(), canvasCaptureWidth * greenScaleSlider.value(), canvasCaptureHeight * greenScaleSlider.value());
        }
        //blue
        if (blueCheckbox.checked()) {
            blue.image(blues, 0 + blueXSlider.value(), 0 + blueYSlider.value(), canvasCaptureWidth * blueScaleSlider.value(), canvasCaptureHeight * blueScaleSlider.value());
        }

        //purple
        if (purpleCheckbox.checked()) {
            purple.image(purples, 0 + purpleXSlider.value(), 0 + purpleYSlider.value(), canvasCaptureWidth * purpleScaleSlider.value(), canvasCaptureHeight * purpleScaleSlider.value());
        }
        //teal
        if (tealCheckbox.checked()) {
            teal.image(teals, 0 + tealXSlider.value(), 0 + tealYSlider.value(), canvasCaptureWidth * tealScaleSlider.value(), canvasCaptureHeight * tealScaleSlider.value());
        }


        drawRiso();
    }
}