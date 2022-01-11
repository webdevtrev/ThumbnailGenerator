// Covideo.js

// Set variables for the canvas and image
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var img = new Image();
img.src = './images/cheesecake.png';

// Download the image when download is clicked.
$('#download-jpg').click(function(e) {
    var canvas = document.getElementById('canvas');
    var dl = document.getElementById('download-jpg');
    dl.href = document.getElementById('templateImage').src;
    dl.download = "covideo-template.jpg";

    // IE10+ : (has Blob, but not a[download] or URL)
    if (navigator.msSaveBlob) {
        var blob = canvas.msToBlob();
        window.navigator.msSaveBlob(blob, 'covideo-template.jpg');
        //window.location = canvas.toDataURL("Image/jpeg");
    }
});

// Function to create new image from the canvas.
function reloadImg() {
    // Set canvas global values.
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img,0,0);

    console.log(canvas.toDataURL());
    // Set the preview image to be equal to the canvas data.
    document.getElementById('templateImage').src = canvas.toDataURL();
}

// When the template image loads start the canvas and create the first 
// preview image.
img.onload = function() {
    ctx.drawImage(img,0,0);
    reloadImg();
    $('#message').val('');
}

// Reload the image when fields change.
$('#reload').click(reloadImg);
$('input').on('input', reloadImg);
$('form').submit(function(e) {
    e.preventDefault();
    reloadImg();
});