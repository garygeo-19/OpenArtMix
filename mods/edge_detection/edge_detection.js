// https://kylemcdonald.github.io/cv-examples/
// https://inspirit.github.io/jsfeat/sample_canny_edge.html

//Based on : https://editor.p5js.org/kylemcdonald/sketches/HJXWJv9nX

var capture;
var buffer;
var result;
var h, w;


function preload() {
    //img = loadImage("Transfer-an-Image.png");
    img = loadImage("/assets/BeautifulDay.jpg");


    refreshNeeded = false;
}

function setup() {
    img.resize(500, 0)
    w = img.width;
    h = img.height;
    // console.log("height:");
    // console.log(h);
    cnv = createCanvas(w, h);
    cnv.id('frameCanvasOut');
    parent.postMessage('updateSize');
    buffer = new jsfeat.matrix_t(w, h, jsfeat.U8C1_t);
    settingsChanged = true; //setting for the first execution
}

function jsfeatToP5(src, dst) {
    if (!dst || dst.width != src.cols || dst.height != src.rows) {
        dst = createImage(src.cols, src.rows);
    }
    var n = src.data.length;
    dst.loadPixels();
    var srcData = src.data;
    var dstData = dst.pixels;
    for (var i = 0, j = 0; i < n; i++) {
        var cur = srcData[i];
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = 255;
    }
    dst.updatePixels();
    return dst;

}

function draw() {
    if (refreshNeeded) { //look for a image transfer
        loadCanvasImage();
    }
    if (settingsChanged || refreshNeeded) {
        console.log("settings changed")
        image(img, 0, 0, w, h);
        img.loadPixels();
        if (img.pixels.length > 0) { // don't forget this!
            var blurSize = select('#blurSize').elt.value;
            var lowThreshold = select('#lowThreshold').elt.value;
            var highThreshold = select('#highThreshold').elt.value;
            var invertChecked = select('#invertCheck').elt.checked;
            console.log(invertChecked);

            blurSize = map(blurSize, 0, 100, 1, 12);
            lowThreshold = map(lowThreshold, 0, 100, 0, 255);
            highThreshold = map(highThreshold, 0, 100, 0, 255);

            jsfeat.imgproc.grayscale(img.pixels, w, h, buffer);
            jsfeat.imgproc.gaussian_blur(buffer, buffer, blurSize, 0);
            jsfeat.imgproc.canny(buffer, buffer, lowThreshold, highThreshold);
            var n = buffer.rows * buffer.cols;
            if (invertChecked) {
                //uncomment the following lines to invert the image
                for (var i = 0; i < n; i++) {
                    buffer.data[i] = 255 - buffer.data[i];
                }
            }
            result = jsfeatToP5(buffer, result);
            image(result, 0, 0, w, h);
        }
        settingsChanged = false;
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
        img.resize(500, 0);
        w = img.width;
        h = img.height;
        console.log("loadCanvas Ended");
        settingsChanged = true;
        refreshNeeded = false;
        parent.postMessage('updateSize');
    });
}