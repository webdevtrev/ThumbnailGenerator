import './utils/inset.js';
import { roundRect } from './utils/roundRect.js';
import { clipRect } from './utils/clipRect.js';
// Set variables for the canvas and image
const mini = document.getElementById('canvas-mini');
const miniCtx = mini.getContext('2d');
const mid = document.getElementById('canvas-mid');
const midCtx = mid.getContext('2d');
const img = new Image();
let first = true;
// img.src = './images/cheesecake.png';

document.querySelector('#download-jpg').addEventListener('click', () => {
  // var canvas = document.getElementById('canvas');
  var dl = document.getElementById('download-jpg');
  if (first) {
    dl.href = document.getElementById('templateImageMini').src;
    dl.download = `thumb_mini.png`;
    // IE10+ : (has Blob, but not a[download] or URL)
    if (navigator.msSaveBlob) {
      var blob = mini.msToBlob();
      window.navigator.msSaveBlob(blob, 'thumb_mini.png');
      //window.location = canvas.toDataURL("Image/jpeg");
    }
    first = false;
    dl.click();
  } else {
    dl.href = document.getElementById('templateImageMid').src;
    dl.download = `thumb_mid.png`;
    // IE10+ : (has Blob, but not a[download] or URL)
    if (navigator.msSaveBlob) {
      var blob = mid.msToBlob();
      window.navigator.msSaveBlob(blob, 'thumb_mid.png');
      //window.location = canvas.toDataURL("Image/jpeg");
    }
    first = true;
  }
});

// Function to create new image from the canvas.
function reloadImg() {
  //Draw images
  drawImageScaled(img, mini, miniCtx);
  drawImageScaled(img, mid, midCtx, true);
  //Make style adjustments
  makeBorder(mini, miniCtx, 'mini');
  makeBorder(mid, midCtx, 'mid');
  // Set the preview image to be equal to the canvas data.
  document.getElementById('templateImageMini').src = mini.toDataURL();
  document.getElementById('templateImageMid').src = mid.toDataURL();
}
function drawImageScaled(img, canvas, ctx, rounded) {
  if (rounded) {
    clipRect(ctx, 0, 0, canvas.width, canvas.height, 20);
  }

  // Finds ratio for srinking
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  // Grabs te smallest ratio to know which should be centered so it fills out the most of the area
  var ratio = Math.max(hRatio, vRatio);
  // Finds values for shifting to keep in center
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;

  //Clears canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    1,
    1,
    img.width - 2,
    img.height - 2,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
function makeBorder(canvas, ctx, type) {
  switch (type) {
    case 'mini':
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
      break;
    case 'mid':
      ctx.shadowInset = true;
      ctx.shadowBlur = 7.439;
      ctx.shadowColor = 'rgba(0,0,0,.6)';
      ctx.fillStyle = 'transparent';
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#b2b2b2';
      roundRect(ctx, 0, 0, canvas.width, canvas.height, 20, true);
      // ctx.fillRect(4, 4, canvas.width - 8, canvas.height - 8);
      ctx.shadowColor = 'transparent';
      ctx.shadowInset = false;

      break;

    default:
      break;
  }
}

// When the template image loads start the canvas and create the first
// preview image.
img.onload = function () {
  reloadImg();
};

document.querySelector('#uploadedImage').addEventListener('change', (e) => {
  console.log(e.target);
  img.src = window.URL.createObjectURL(e.target.files[0]);
  console.log(img.src);
});
