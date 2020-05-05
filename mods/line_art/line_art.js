//based on https://gist.github.com/u-ndefine/8e4bc21be4275f87fefe7b2a68487161
let img;

function decel(x) { // as an easing function
    return 1 - (x - 1) * (x - 1);
}

function preload() {
    img = loadImage("Transfer-an-Image.png"); //loadImage('/assets/BikeRiders.jpg');
    refreshNeeded = false;
}


function setup() {
    background(255);
    cnv = createCanvas(500, 500);
    cnv.id('frameCanvasOut');
}

function draw() {
    if (refreshNeeded) { //look for a image transfer
        loadCanvasImage();
    }
}

function lineArt() {
    strokeWeight(2);
    noFill();
    for (y = 0.0; y < 50; y++) {
        l = 0;
        beginShape(LINES);
        for (x = 0; x < width * 4; x++) {
            xx = x / 4.0;

            // using this version will generate a squished image due to using map(...) in line 26
            // color c = img.get(int(xx),int(y*height/50.0));
            c = img.get(int(xx), int(map(y * height / 50.0, 0, height, 50, height - 50)));

            l += (255 - red(c)) / 255 / 4.0; // period of the wave

            // 5*decel(m) sets the amplitude of the wave
            // map(...) sets the position of the wave
            m = (255 - red(c)) / 255.0; // separate it from an increasing variable (l)
            vertex(xx, map((y + 0.5) * height / 50.0, 0, height, 50, height - 50) + sin(l * PI / 2.0) * 5 * decel(m));
        }
        endShape();
    }


}


function loadCanvasImage() {
    console.log("loadCanvas Started");
    let importCanvas = document.getElementById("frameCanvasIn");
    //create new correctly sized canvas
    cnv = createCanvas(importCanvas.width, importCanvas.height);
    cnv.id('frameCanvasOut');
    loadImage(importCanvas.toDataURL('image/png'), function (loadedImage) {
        img = loadedImage;
        console.log("loadCanvas Ended");
        lineArt();
        refreshNeeded = false;
        parent.postMessage('updateSize');
    });
}