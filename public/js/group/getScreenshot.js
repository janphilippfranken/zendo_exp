function screenShot(width, height){

  var bd = BitmapData.empty(width, height); // function from ivank package, creates an empty 500 by 800 thing
  bd.draw(stage); // drawing the stage
  var rawData = bd.getPixels(new Rectangle(0,0,width,height)); // get pixels from bd and take out rectanlge with the dimensions, again both functions
  // from ivank.js  defined - rawData is in format of data from 0 to 8
  // var newCanvas = document.getElementById('copy');
  var newCanvas = document.createElement("CANVAS");
  // newCanvas.id = ('copy')

  newCanvas.width = width;
  newCanvas.height = height;
  newCanvas.style.display = "none;";
  var ctx = newCanvas.getContext("2d");
  var imgData = ctx.createImageData(width, height); // width x height
  var data = imgData.data;
  // copy img byte-per-byte into our ImageData
  for (var b = 0, len = height * width * 4 ; b < len; b++) {
      data[b] = rawData[b];
  }
  // now we can draw our imagedata onto the canvas
  ctx.putImageData(imgData, 0, 0);

  var dataURL = newCanvas.toDataURL();
  return dataURL
}
