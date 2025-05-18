const log = console.log;

/*

Code divider

Konva canvas drawing code

*/

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: 'konva-container',
  width: width,
  height: height,
});

const layer = new Konva.Layer();
stage.add(layer);

let isDrawing = false;
let lastLine;


stage.on('mousedown touchstart', function (e) {
  isDrawing = true;
  const pos = stage.getPointerPosition();
  const LineX = pos.x + numberX;
  const LineY = pos.y + numberY;

  lastLine = new Konva.Line({
    stroke: 'lightgreen', //put colour variable here
    strokeWidth: 5, //put width variable here
    lineCap: 'round',
    lineJoin: 'round',
    points: [LineX, LineY, LineX, LineY],
  });
  
  layer.add(lastLine);
});


stage.on('mouseup touchend', function () {
  isDrawing = false;
});

stage.on('mousemove touchmove', function (e) {
  if (isDrawing == false) {
    return;
  }
  const pos = stage.getPointerPosition();
  const LineX = pos.x + numberX;
  const LineY = pos.y + numberY;
  const newLine = lastLine.points().concat([LineX, LineY]);
  lastLine.points(newLine);
});

/*

This code is janky and rather resource intensive
but its the only way i could find to get the circle
to update constantly, follow the cursor and also draw
without janky looking jumps. This interval code works
as essentially the main update funciton.

Below is the initial painting of the Konva objects and
initilisation of variables.

*/
const line = new Konva.Line({
  stroke: "grey",
  strokeWidth: 2,
  lineCap: 'round',
  lineJoin: 'round'
});
layer.add(line);

const ring = new Konva.Ring({
    x: stage.width() / 2,
  y: stage.height() / 2,
  innerRadius: 7,
  outerRadius: 7,
  strokeWidth: 1,
  stroke: 'white'
  });

layer.add(ring);

const ring2 = new Konva.Ring({
    x: stage.width() / 2,
  y: stage.height() / 2,
  innerRadius: 4,
  outerRadius: 4,
  strokeWidth: 1,
  stroke: 'red'
  });

layer.add(ring2);

var Xcompare = "higher";
var Ycompare = "higher";

var randomX = 50;
var randomY = 50;

var numberX = 0;
var numberY = 0;

var positionX = 0;
var positionY = 0;

var x = setInterval(function() {

  
  /*

 The below code sets random points within a 50 x 50 box around
  the cursor for both the X and Y coordinate. Then
  using a stack of maths it accelerates the ring towards
  these points. Once the ring passes one of these points
  a new coordinate is set and the ring begins to accelerate
  towards the new point. 

  */


  if (Xcompare == "higher"){
    numberX = (numberX + 0.2+(numberY/500 * numberY))
  }
  else {
    numberX = (numberX - 0.2-(numberY/500 * numberY))
  }
  if (Ycompare == "higher"){
    numberY = (numberY + 0.2+(numberX/500 * numberX))
  }
  else {
    numberY = (numberY - 0.2-(numberX/500 * numberX))
  }

  const pos = stage.getPointerPosition();
  positionX = numberX + pos.x;
  positionY = numberY + pos.y;

  line.setAttrs({
    points: [positionX, positionY, pos.x, pos.y]
  });

  ring.setAttrs({
    x: positionX,
    y: positionY,
  });
  ring2.setAttrs({
    x: pos.x,
    y: pos.y,
 });
  layer.batchDraw();

  if (Xcompare == "higher"){
    if (numberX > randomX){
      randomX = Math.floor((Math.random() * 50) + 1 - 25);
    if (randomX < numberX){
      Xcompare = "lower";
    }
    else{
      Xcompare = "higher";
    }
    console.log(randomX);
    }
    
  }
  else{
    if (numberX < randomX){
      randomX = Math.floor((Math.random() * 50) + 1 - 25);
    if (randomX < numberX){
      Xcompare = "lower";
    }
    else{
      Xcompare = "higher";
    }
    console.log(randomX);
    }
  }
  if (Ycompare == "higher"){
    if (numberY > randomY){
      randomY = Math.floor((Math.random() * 50) + 1 - 25);
    if (randomY < numberY){
      Ycompare = "lower";
    }
    else{
      Ycompare = "higher";
    }
    console.log(randomY);
    }
    
  }
  else{
    if (numberY < randomY){
      randomY = Math.floor((Math.random() * 50) + 1 - 25);
    if (randomY < numberY){
      Ycompare = "lower";
    }
    else{
      Ycompare = "higher";
    }
    console.log(randomY);
    }
  }
}, 10);
