let gra;
let graZoom = 1;
let triZoom = 3;
let deltaSec = 0;
let rote = 0; //rotation amout
let img;
let cnv;
let refreshInProgress;
let imageX = 0;
let imageY = 0;

function preload() {
    img = loadImage("Transfer-an-Image.png"); //loadImage('/assets/BikeRiders.jpg');
    refreshNeeded = false;
    parent.postMessage('updateSize'); //update the framesize
}

function setup() {
    cnv = createCanvas(500, 500);
    cnv.id('frameCanvasOut');
    image(img, 0, 0, 500, 500);

    createElement('br');
    createElement('label', 'X:');
    xImageSlider = createSlider(0, width, width / 2, 1);
    imageX = width / 2;
    xImageSlider.input(function () {
        imageX = xImageSlider.value();

    });

    createElement('label', 'Y:');
    yImageSlider = createSlider(0, height, height / 2, 1);
    imageY = height / 2
    yImageSlider.input(function () {
        imageY = yImageSlider.value();

    });
    createElement('br');
    createElement('label', 'Reflects:');
    zoomTriangleSlider = createSlider(.1, 20, 3, .1);
    zoomTriangleSlider.input(function () {
        triZoom = zoomTriangleSlider.value();
        init();
    });

    createElement('label', 'Zoom:');
    zoomImageSlider = createSlider(0, 10, 1, .1);
    zoomImageSlider.input(function () {
        graZoom = zoomImageSlider.value();

    });

    createElement('label', 'Rotate:');
    rotateSlider = createSlider(0, 360, 0, 1);
    rotateSlider.input(function () {
        rote = rotateSlider.value() * PI / 180;
    });
    init();
    parent.postMessage('updateSize');
}

function draw() {
    // console.log("draw stART");


    if (refreshNeeded) { // if an image has been transfered

        refreshNeeded = false;
        img = null;
        console.log("Refresh Needed");
        console.log(refreshNeeded);
        loadCanvasImage();
        parent.postMessage('updateSize');

    }
    if (img != undefined) {
        //graphic

        let triH = gra.width * 0.5 * pow(3, 0.5);

        gra.clear();
        gra.background(0);
        gra.push();
        gra.translate((gra.width - (imageX)) / 2, triH - (imageY) / 2);
        gra.rotate(rote);
        gra.imageMode(CENTER);
        gra.image(img, 0, 0, width * graZoom, height * graZoom); //gg:altered
        gra.pop();

        //mask
        gra.erase();
        gra.triangle(0, triH, 0, 0, gra.width / 2, triH);
        gra.triangle(gra.width, triH, gra.width, 0, gra.width / 2, triH);
        gra.rect(0, triH, gra.width, gra.height - triH);
        gra.noErase();

        // tiling gra
        clear();
        let offY = 0;
        let size = dist(0, 0, width, height);
        translate(width / 2, height / 2);
        rotate(rote);
        for (let x = -size / 2 - gra.width; x < size / 2 + gra.width; x += gra.width * 1.5) {
            for (let y = -size / 2 - triH; y < size / 2 + triH; y += triH * 2) {
                drawHexa(x, y + offY);
            }
            offY = offY == 0 ? triH : 0;
        }
    }
}

function init() {
    console.log("init started");;
    let graSize = Math.floor(max(width, height) / triZoom); //random(3, 15));
    gra = createGraphics(graSize, graSize);
    gra.noStroke();
}

function drawHexa(cx, cy, triGra = gra, radius = gra.width) {
    push();
    translate(cx, cy);

    for (let rad = 0; rad < TWO_PI; rad += TWO_PI / 3) {
        push();
        rotate(rad);
        image(triGra, 0, 0);
        scale(1, -1);
        image(triGra, 0, 0);
        pop();
    }
    pop();
}

function loadCanvasImage() {
    console.log("loadCanvas Started");
    let importCanvas = document.getElementById("frameCanvasIn");
    loadImage(importCanvas.toDataURL('image/png'), function (loadedImage) {
        img = loadedImage;
        console.log("loadCanvas Ended");
        init();
    });
}