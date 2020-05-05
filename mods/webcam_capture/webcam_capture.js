let capture;
let cnv;

function setup() {
    cnv = createCanvas(640, 480);
    cnv.id('frameCanvasOut');
    parent.postMessage('updateSize'); //update the framesize
    capture = createCapture(VIDEO);
    capture.size(640, 480);
    capture.hide();
}

function draw() {
    background(255);
    image(capture, 0, 0, 640, 480);

}