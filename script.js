const log = console.log;

/*

Code divider

Konva canvas drawing code

*/
var mirror = "off";
var speed = 15;
var size = 5;
const width = window.innerWidth;
const height = window.innerHeight;


const stage = new Konva.Stage({
  container: 'konva-container',
  width: width,
  height: height,
});

const layer = new Konva.Layer();
stage.add(layer);

const layer2 = new Konva.Layer();
stage.add(layer2);

let isDrawing = false;
let lastLine;
let lastLineMirror;

stage.on('mousedown touchstart', function (e) {
  isDrawing = true;
  const pos = stage.getPointerPosition();
  const LineX = pos.x + numberX;
  const LineY = pos.y + numberY;
  const InvertX = pos.x - numberX;
  const InvertY = pos.y - numberY;

  lastLine = new Konva.Line({
    stroke: "rgb"+activeColour, //put colour variable here
    strokeWidth: size, //put width variable here
    lineCap: 'round',
    lineJoin: 'round',
    points: [LineX, LineY, LineX, LineY],
  });

  if (mirror == "on")
  {lastLineMirror = new Konva.Line({
    stroke: "rgb"+activeColour2,
    strokeWidth: size, //put width variable here
    lineCap: 'round',
    lineJoin: 'round',
    points: [InvertX, InvertY, InvertX, InvertY],
    });
    layer2.add(lastLineMirror);
  }
  
  
  layer2.add(lastLine);

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
  const InvertX = pos.x - numberX;
  const InvertY = pos.y - numberY;
  const newLine = lastLine.points().concat([LineX, LineY]);
  lastLine.points(newLine);
  if (mirror == "on")
  {const newLineMirror = lastLineMirror.points().concat([InvertX, InvertY]);
  lastLineMirror.points(newLineMirror);
  }
  
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

const line2 = new Konva.Line({
  stroke: "grey",
  strokeWidth: 2,
  lineCap: 'round',
  lineJoin: 'round'
});
layer.add(line2);

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
  innerRadius: 7,
  outerRadius: 7,
  strokeWidth: 1,
  stroke: 'white'
  });

layer.add(ring2);

const ringMain = new Konva.Ring({
    x: stage.width() / 2,
  y: stage.height() / 2,
  innerRadius: 4,
  outerRadius: 4,
  strokeWidth: 1,
  stroke: 'white'
  });

layer.add(ringMain);

var Xcompare = "higher";
var Ycompare = "higher";

var randomX = 5;
var randomY = 5;

var numberX = 0;
var numberY = 0;

var positionX = 0;
var positionY = 0;
var invertX = 0;
var invertY = 0;


  /*

 The below code sets random points within a 100x100 box around
  the cursor for both the X and Y coordinate. Then
  using a stack of maths it accelerates the ring towards
  these points. Once the ring passes one of these points
  a new coordinate is set and the ring begins to accelerate
  towards the new point. 

  */
var x = setInterval(function() {
  /*
  If the pen isnt currently drawing the interval stops and
  all the rings and lines are hidden by changing their colour.
  This change prevented all errors that were being thrown
  when positions were being requested while the pen wasn't
  on the canvas.
  */
  if (isDrawing == false) {
  line2.setAttrs({
    stroke: "#1a1a20",
  });
  line.setAttrs({
    stroke: "#1a1a20",
  });
  ring2.setAttrs({
    stroke: "#1a1a20",
  });
  ring.setAttrs({
    stroke: "#1a1a20",
  });
  ringMain.setAttrs({
    stroke: "#1a1a20",
  });
    return;
  }

  /*
  If the pen is drawing then the colours are set back to normal
  and the functions are run.
  */
  line2.setAttrs({
    stroke: "grey",
  });
  line.setAttrs({
    stroke: "grey",
  });
  ring2.setAttrs({
    stroke: "rgb"+activeColour2,
  });
  ring.setAttrs({
    stroke: "rgb"+activeColour,
  });
  ringMain.setAttrs({
    stroke: "white",
  });

  if (Xcompare == "higher"){
    numberX = (numberX + 0.2+(numberY/(4000 / speed) * numberY))
  }
  else {
    numberX = (numberX - 0.2-(numberY/(4000 / speed) * numberY))
  }
  if (Ycompare == "higher"){
    numberY = (numberY + 0.2+(numberX/(4000 / speed) * numberX))
  }
  else {
    numberY = (numberY - 0.2-(numberX/(4000 / speed) * numberX))
  }

  const pos = stage.getPointerPosition();
  positionX = numberX + pos.x;
  positionY = numberY + pos.y;
  invertX = pos.x - numberX;
  invertY = pos.y - numberY;

  line.setAttrs({
    points: [positionX, positionY, pos.x, pos.y]
  });

  if (mirror == "on")
  {
    line2.setAttrs({
    stroke: 'grey',
    points: [invertX, invertY, pos.x, pos.y]
  });
  }
  else {
    line2.setAttrs({
    stroke: "#1a1a20",
  });
  }
  

  ring.setAttrs({
    x: positionX,
    y: positionY,
  });

  if (mirror == "on")
  {
    ring2.setAttrs({
    stroke: "rgb"+activeColour2,
    x: invertX,
    y: invertY,
  });
  }
  else{
    ring2.setAttrs({
    stroke: "#1a1a20",
  });
  }

 ringMain.setAttrs({
    x: pos.x,
    y: pos.y,
 });
  layer.batchDraw();

  if (Xcompare == "higher"){
    if (numberX > randomX){
      randomX = Math.floor((Math.random() * 50) + 1 - 25);
      CompareCoords();
    }
    
  }
  else{
    if (numberX < randomX){
      randomX = Math.floor((Math.random() * 50) + 1 - 25);
      CompareCoords();
    }
  }
  if (Ycompare == "higher"){
    if (numberY > randomY){
      randomY = Math.floor((Math.random() * 50) + 1 - 25);
      CompareCoords();
    }
    
  }
  else{
    if (numberY < randomY){
      randomY = Math.floor((Math.random() * 10) + 1 - 25);
      CompareCoords();
    }
  }
}, 10);

/*
Removed compare script into a seperate function that only
gets called when needed.
*/

function CompareCoords(){
    if (randomY < numberY){
      Ycompare = "lower";
    }
    else{
      Ycompare = "higher";
    }
    console.log(randomY);

    if (randomX < numberX){
    Xcompare = "lower";
    }
    else{
      Xcompare = "higher";
    }
    console.log(randomX);
}
/*

By replicating the randomised position code i created randomised
values for an RGB colour picker to slowly progress towards
instead of rapidly picking different unrelated colours.

*/

var RED = 155;
var GREEN = 55;
var BLUE = 255;
var RED2 = 255;
var GREEN2 = 55;
var BLUE2 = 155;

var REDtarget = 154;
var GREENtarget = 54;
var BLUEtarget = 254;
var REDtarget2 = 154;
var GREENtarget2 = 54;
var BLUEtarget2 = 254;

var REDcompare = "lower";
var GREENcompare = "lower";
var BLUEcompare = "lower";
var activeColour = "("+RED+","+GREEN+","+BLUE+")"
var REDcompare2 = "lower";
var GREENcompare2 = "lower";
var BLUEcompare2 = "lower";
var activeColour2 = "("+RED2+","+GREEN2+","+BLUE2+")"

const redSlider = document.getElementById('redSlider');
const greenSlider = document.getElementById('greenSlider');
const blueSlider = document.getElementById('blueSlider');
const colourTest = document.getElementById('colourTest');

const redSlider2 = document.getElementById('redSlider2');
const greenSlider2 = document.getElementById('greenSlider2');
const blueSlider2 = document.getElementById('blueSlider2');
const colourTest2 = document.getElementById('colourTest2');

var u = setInterval(function() {

colourTest.style.backgroundColor = "rgb"+activeColour;
colourTest2.style.backgroundColor = "rgb"+activeColour2;

if (REDcompare == "higher"){RED = RED + 1;redSlider.value = RED;}
  else {RED = RED - 1;redSlider.value = RED;}
if (GREENcompare == "higher"){GREEN = GREEN + 1;greenSlider.value = GREEN;}
  else {GREEN = GREEN - 1;greenSlider.value = GREEN;}
if (BLUEcompare == "higher"){BLUE = BLUE + 1;blueSlider.value = BLUE;}
  else {BLUE = BLUE - 1;blueSlider.value = BLUE;}
activeColour = "("+RED+","+GREEN+","+BLUE+")"

if (REDcompare2 == "higher"){RED2 = RED2 + 1;redSlider2.value = RED2;}
  else {RED2 = RED2 - 1;redSlider2.value = RED2;}
if (GREENcompare2 == "higher"){GREEN2 = GREEN2 + 1;greenSlider2.value = GREEN2;}
  else {GREEN2 = GREEN2 - 1;greenSlider2.value = GREEN2;}
if (BLUEcompare2 == "higher"){BLUE2 = BLUE2 + 1;blueSlider2.value = BLUE2;}
  else {BLUE2 = BLUE2 - 1;blueSlider2.value = BLUE2;}
activeColour2 = "("+RED2+","+GREEN2+","+BLUE2+")"



  if (REDcompare == "higher"){
    if (RED >= REDtarget){
      REDtarget = Math.floor((Math.random() * 254) + 1);
      CompareColours();
    }
  }
  else{
    if (RED <= REDtarget){
      REDtarget = Math.floor((Math.random() * 254) + 1);
      CompareColours();
    }

  }
  if (GREENcompare == "higher"){
    if (GREEN >= GREENtarget){
      GREENtarget = Math.floor((Math.random() * 254) + 1);
      CompareColours();
    }
  }
  else{
    if (GREEN <= GREENtarget){
      GREENtarget = Math.floor((Math.random() * 254) + 1);
      CompareColours();
    }
  }

  if (BLUEcompare == "higher"){
    if (BLUE >= BLUEtarget){
      BLUEtarget = Math.floor((Math.random() * 254) + 1);
      CompareColours();
    }
  }
  else{
    if (BLUE <= BLUEtarget){
      BLUEtarget = Math.floor((Math.random() * 254) + 1);
      CompareColours();
    }
}

//Divider between the two compare stacks

if (REDcompare2 == "higher"){
    if (RED2 >= REDtarget2){
      REDtarget2 = Math.floor((Math.random() * 254) + 1);
      CompareColours2();
    }
  }
  else{
    if (RED2 <= REDtarget2){
      REDtarget2 = Math.floor((Math.random() * 254) + 1);
      CompareColours2();
    }

  }
  if (GREENcompare2 == "higher"){
    if (GREEN2 >= GREENtarget2){
      GREENtarget2 = Math.floor((Math.random() * 254) + 1);
      CompareColours2();
    }
  }
  else{
    if (GREEN2 <= GREENtarget2){
      GREENtarget2 = Math.floor((Math.random() * 254) + 1);
      CompareColours2();
    }
  }

  if (BLUEcompare2 == "higher"){
    if (BLUE2 >= BLUEtarget2){
      BLUEtarget2 = Math.floor((Math.random() * 254) + 1);
      CompareColours2();
    }
  }
  else{
    if (BLUE2 <= BLUEtarget2){
      BLUEtarget2 = Math.floor((Math.random() * 254) + 1);
      CompareColours2();
    }
}
} ,100);

function CompareColours(){
    if (REDtarget < RED){
      REDcompare = "lower";
    }
    else{
      REDcompare = "higher";
    }

    if (GREENtarget < GREEN){
      GREENcompare = "lower";
    }
    else{
      GREENcompare = "higher";
    }

    if (BLUEtarget < BLUE){
      BLUEcompare = "lower";
    }
    else{
      BLUEcompare = "higher";
    }
}

function CompareColours2(){
    if (REDtarget2 < RED2){
      REDcompare2 = "lower";
    }
    else{
      REDcompare2 = "higher";
    }

    if (GREENtarget2 < GREEN2){
      GREENcompare2 = "lower";
    }
    else{
      GREENcompare2 = "higher";
    }

    if (BLUEtarget2 < BLUE2){
      BLUEcompare2 = "lower";
    }
    else{
      BLUEcompare2 = "higher";
    }
}

redSlider.addEventListener('change', function() {
  RED = redSlider.value;
  CompareColours()
});

greenSlider.addEventListener('change', function() {
  GREEN = greenSlider.value;
  CompareColours()
});

blueSlider.addEventListener('change', function() {
  BLUE = blueSlider.value;
  CompareColours()
});

redSlider2.addEventListener('change', function() {
  RED2 = redSlider2.value;
  CompareColours2()
});

greenSlider2.addEventListener('change', function() {
  GREEN2 = greenSlider2.value;
  CompareColours2()
});

blueSlider2.addEventListener('change', function() {
  BLUE2 = blueSlider2.value;
  CompareColours2()
});

var speedTick = 0;
var x = setInterval(function() {
  speedTick = Math.floor((Math.random() * 3) -1);
  speedSlider.value = speed - speedTick;
  speed = speedSlider.value;
}, 200);

/*

Menu button functions
Requests menu elements from the main document and then
listens for events to enable the functionality of the
buttons and sliders.

*/
const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', function() {
  layer2.destroyChildren();
});

const mirrorBtn = document.getElementById('mirrorBtn');

mirrorBtn.addEventListener('click', function() {
  ToggleMirror();
});


/*This function listens to any change updates to match
the current value of the speed slider and then applies
 a randomiser to increment the value*/

const speedSlider = document.getElementById('speedSlider');
speedSlider.addEventListener('change', function() {
  speed = speedSlider.value;
});

var speedTick = 0;
var x = setInterval(function() {
  speedTick = Math.floor((Math.random() * 3) -1);
  speedSlider.value = speed - speedTick;
  speed = speedSlider.value;
}, 200);

/*This function is a mirror image of the above function
but rewritten for the size slider and slowed down*/

const sizeSlider = document.getElementById('sizeSlider');
sizeSlider.addEventListener('change', function() {
  size = sizeSlider.value;
});

var sizeTick = 0;
var x = setInterval(function() {
  sizeTick = Math.floor((Math.random() * 3) -1);
  sizeSlider.value = size - sizeTick;
  size = sizeSlider.value;
}, 500);

//This function handles the Mirror toggle logic and button appearance

function ToggleMirror(){
  console.log("MirrorToggle");
  if (mirror == "on")
  { mirror = "off" 
    mirrorBtn.style.backgroundColor = null;
    mirrorBtn.style.color = null;
  }
  else 
  { mirror = "on" 
    mirrorBtn.style.backgroundColor = "#984bb6";
    mirrorBtn.style.color = "black";
  }
}