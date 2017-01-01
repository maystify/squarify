var fs = require('fs'),
    gm = require('gm').subClass({imageMagick: true});

function askCropAndResize(imageName, wheelSize){
  return new Promise( function(resolve, reject) {

    // obtain the size of an image
    var fileName= './photos/' + imageName;

    // Create the output filename by combining input and requested size
    var cropped = './squarified/' + imageName.split('.')[0] + '-' + wheelSize + '.png';

    // the original image with graphicsmagick / create a photo object
    var photo = gm(fileName);

    // determine size of the picture
    photo.size(function (err, size) {

      // signal in case photo can not be loaded ect.
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      // Define w as the width of the image
      var w = size.width;

      // Define h as the width of the image
      var h = size.height;

      // Defining what small (which side is smallest) is in different circumstances.
      var small;
      if (w>h) {
        small = h;
      }
      else {
        small = w;
      }

      // We are cropping the image and resizing it.
      photo.crop(small, small, Math.floor((w-small)/2), Math.floor((h-small)/2))
        .resizeExact(wheelSize, wheelSize)
        .write(cropped, function (err) {
          if (err) {
            console.log('failed to write image', err);
            reject(err);
            return;
        }

          resolve(cropped, wheelSize, wheelSize);
        }
      );
    });
  });
};

module.exports = askCropAndResize;
