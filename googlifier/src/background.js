/** Detect objects in canvas and rescale from detector to canvas coordinates.
    Params:
        canvas: 2d canvas drawing object
        detector: `objectdetect` callback object?
        ROI: "Region of Interest" area to run detection
            [lower x bound, upper x bound, lower y bound, upper y bound]
    Return: Bounding box of detected object
 */
function detectAndRescale(canvas, detector, ROI) {
    ROI = ROI || [0, 0, canvas.width, canvas.height]; // Nifty way of faking the null coalescing operator. Mad props.
    var rects = detector.detect(canvas, 1, 1, ROI);
    for (var i = 0; i < rects.length; ++i) {
        var rect = rects[i];
        rect[0] = ROI[0] + rect[0] * ROI[2] / detector.canvas.width;
        rect[1] = ROI[1] + rect[1] * ROI[3] / detector.canvas.height;
        rect[2] = rect[2] * ROI[2] / detector.canvas.width;
        rect[3] = rect[3] * ROI[3] / detector.canvas.height;
    }
    return rects;
}


function drawLeftEye(context, rect, choice) {
    // console.log(choice);
    var img = new Image();
    if (choice == 1) {
        drawEye(context, rect);
    } else if (choice == 2) {
        img.src="../img/eyes/anime-left.png";
    } else if (choice == 3) {
        img.src="../img/eyes/tumblr-left.png";
    } else if (choice == 4) {
        img.src="../img/eyes/Googly-left.png";
    } else if (choice == 5) {
        // drawSauronEye(context, rect);
        img.src="../img/eyes/sauron.png";
    }
    context.drawImage(img, rect[0], rect[1], rect[2], rect[3]);
    // console.log(img.src);
}

function drawRightEye(context, rect, choice) {
    // console.log(choice);
    var img = new Image();
    if (choice == 1) {
        drawEye(context, rect);
    } else if (choice == 2) {
        img.src="../img/eyes/anime-right.png";
    } else if (choice == 3) {
        img.src="../img/eyes/tumblr-right.png";
    } else if (choice == 4) {
        img.src="../img/eyes/Googly-right.png";
    } else if (choice == 5) {
        // drawSauronEye(context, rect);
        img.src="../img/eyes/sauron.png";
    }
    context.drawImage(img, rect[0], rect[1], rect[2], rect[3]);
    // console.log(img.src);
}


// function drawLeftAnimeEye(context, rect) {
//     var img = new Image();
//     img.src="../img/eyes/anime-left.png";
//     context.drawImage(img, rect[0], rect[1], rect[2], rect[3]);
// }
// function drawRightAnimeEye(context, rect) {
//     var img = new Image();
//     img.src="../img/eyes/anime-right.png";
//     context.drawImage(img, rect[0], rect[1], rect[2], rect[3]);
// }



// function drawLeftTumblrEye(context, rect) {
//     var img = new Image();
//     img.src="../img/eyes/tumblr-left.png";
//     context.drawImage(img, rect[0], rect[1], rect[2], rect[3]);
// }
// function drawRightTumblrEye(context, rect) {
//     var img = new Image();
//     img.src="../img/eyes/tumblr-right.png";
//     context.drawImage(img, rect[0], rect[1], rect[2], rect[3]);
// }


// function drawLeftGooglyEye(context, rect) {
//     var img = new Image();
//     img.src="../img/eyes/Googly-left.png";
//     context.drawImage(img, rect[0], rect[1], rect[2], rect[3]);
// }
// function drawRightGooglyEye(context, rect) {
//     var img = new Image();
//     img.src="../img/eyes/Googly-right.png";
//     context.drawImage(img, rect[0], rect[1], rect[2], rect[3]);
// }


// function drawSauronEye(context, rect) {
//     var img = new Image();
//     img.src="../img/eyes/sauron.png";
//     context.drawImage(img, rect[0], rect[1], rect[2], rect[3]);
// }



/** Draw googly eye within given rectangle and context.
    Params:
        context: 2d canvas drawing object
        rect: Bounding box
            [lower x bound, upper x bound, lower y bound, upper x bound]
 */
function drawEye(context, rect) {
    var eye = {
            x: rect[0] + (rect[2] * 0.5),
            y: rect[1] + (rect[3] * 0.5),
            radius: rect[2] * 0.5,
            startAngle: 0,
            endAngle: 2 * Math.PI
        },
        pupil = {
            x: rect[0] + (rect[2] * 0.5),
            y: rect[1] + (rect[3] * 0.5),
            radius: rect[2] * 0.5 * 0.6,
            startAngle: 0,
            endAngle: 2 * Math.PI
        },
        randomDistance = (eye.radius - pupil.radius) * 1.6;

    pupil.x = pupil.x + (Math.random() - 0.5) * randomDistance;
    pupil.y = pupil.y + (Math.random() - 0.5) * randomDistance;

    // Draw the eye
    context.beginPath();
    context.arc(eye.x, eye.y, eye.radius, eye.startAngle, eye.endAngle);
    context.fillStyle = '#fff';
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = '#000';
    context.stroke();
    context.closePath();

    // And the pupil
    context.beginPath();
    context.arc(pupil.x, pupil.y, pupil.radius, pupil.startAngle, pupil.endAngle);
    context.fillStyle = '#000';
    context.closePath();
    context.fill();
}

/** Reusable eye detector of fixed 50x50 px resolution */
var eyeDetector = new objectdetect.detector(40, 40, 1.1, objectdetect.eye);

//chrome.browserAction.onClicked.addListener(function (tab) { // Fired when user clicks icon
//    chrome.tabs.executeScript(tab.id, {
//        'file': 'src/script.js'
//    });
//    chrome.browserAction.disable(tab.id);
//});

//chrome.runtime.onMessage.addListener(
/** Scan image
    Params:
        request: object {'type': 'googlify', 'src': img.src}
        sender: ??? We can probably ignore this ???
        sendResponse: Callback function
 */
var goog = function(request, sender, sendResponse) {
        if (request.type === 'googlify') {
            var img = new Image();

            img.onload = function (event) {
                var canvas = document.createElement('canvas'),
                    context = canvas.getContext('2d');

                // Define the canvas based on the image
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Detect faces with detector resolution limited to 240 px in either dimensions
                var maxDimension = Math.max(canvas.width, canvas.height),
                    faceDetectorWidth = (maxDimension > 200) ? 200 * canvas.width / maxDimension : canvas.width,
                    faceDetectorHeight = (maxDimension > 200) ? 200 * canvas.height / maxDimension : canvas.height,
                    faceDetector = new objectdetect.detector(faceDetectorWidth, faceDetectorHeight, 1.1, objectdetect.frontalface_alt),
                    faces = detectAndRescale(canvas, faceDetector);

                // Detect and draw eyes within ROIs (regions of interest) in detected faces
                for (var i = 0; i < faces.length; ++i) {
                    var face = faces[i];

                    // Skip if face detector confidence is too low here
                    // if (face[4] < 2) console.log(face);

                    var leftEyeROI  = [face[0] + face[2] * 0.05,
                                       face[1] + face[3] * 0.1,
                                       face[2] * 0.5,
                                       face[3] * 0.5
                                       ],
                        rightEyeROI = [face[0] + face[2] * 0.45,
                                       face[1] + face[3] * 0.1,
                                       face[2] * 0.5,
                                       face[3] * 0.5
                                       ],
                        leftEye  = detectAndRescale(canvas, eyeDetector, leftEyeROI )[0],
                        rightEye = detectAndRescale(canvas, eyeDetector, rightEyeROI)[0];

                                                      //five possibiilities
                    var choice = Math.floor((Math.random() * 5) + 1);

                    if (leftEye)  drawLeftEye(context, leftEye, choice);
                    if (rightEye) drawRightEye(context, rightEye, choice);

                    // If only one eye is found, fill remaining ROI with googly eye
                    if (!rightEye) drawRightEye(context, rightEyeROI, choice);
                    if (!leftEye)  drawLeftEye(context, leftEyeROI, choice);
                }

                sendResponse({
                    'googlified': canvas.toDataURL('image/jpg')
                });
            };

            img.src = request.src;
        }
        return true;
    };

