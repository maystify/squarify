
squarify = require("./squarify.js");

// Unit tests
squarify('photo.jpg', 300).then(fileName => {
  console.log('squarified to 300:' + fileName);
});

squarify('photo.jpg', 72).then(fileName => {
  console.log('squarified to 72:' + fileName);
});
