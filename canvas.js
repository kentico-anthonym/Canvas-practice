var canvas = document.querySelector('canvas');

// Sets the canvas to cover the full browser screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// This gets the context of which inputs will be set
var c = canvas.getContext('2d');
//
// // This property is for defining the fill color of a drawn object.
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
//
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(400, 100, 100, 100);
//
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(300, 300, 100, 100);
//
// c.beginPath();
// // Starting point
// c.moveTo(50, 300);
// // ending point
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// // This sets the color and it will take any css valid color values
// c.strokeStyle = "#fa34a3";
// c.stroke();
//
// // Arc/Circle
// // c.beginPath();
// // c.arc(300, 300, 30, 0, Math.PI * 2, false);
// // c.strokeStyle = 'blue';
// // c.stroke();
//
// function Circle(x, y)
// var colors = ['red', 'blue', 'green'];
// for (var i = 0; i < 500; i++) {
//   // Using multiply by the size of the area to randomize location of drawn object
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   var randNum = (Math.random() * colors.length);
//   c.strokeStyle = colors[Math.floor(randNum)];
//   c.stroke();
// }

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dy= (Math.random() - 0.5) * 8; // Can create negative speeds
// var dx = (Math.random() - 0.5) * 8;
// var radius = 30;

var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
  '#263650',
  '#E74E4E',
  '#F7FBFC',
  '#57CBFF',
  '#2273AA'
];

console.log(colorArray);

window.addEventListener('mousemove',
    function (event) {
      mouse.x = event.x;
      mouse.y = event.y

})

window.addEventListener('resize', function() {

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

  init();
})

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius; // This saves original size state
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      // c.strokeStyle = 'blue';
      // c.stroke();
      c.fillStyle = this.color;
      c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth ||
        this.x - this.radius < 0) { this.dx = -this.dx; }
    if (this.y + this.radius > innerHeight ||
        this.y - this.radius < 0) { this.dy = -this.dy; }

    this.x += this.dx;
    this.y += this.dy;

    // Interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > (-50) &&
        mouse.y - this.y < 50 && mouse.y - this.y > (-50)) {

          // Size check
          if (this.radius < maxRadius) {
            this.radius += 1;
          }
    }
    else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    // This will be the method called
    this.draw();
  }
}

var circleArray = [];

function init() {

  circleArray = [];

  for (var i = 0; i < 800; i++) {
    var x = Math.random() * (innerWidth - (radius * 2 )) + radius; // subtracting the radius to prevent being spawned out of bounds
    var y = Math.random() * (innerHeight - (radius * 2 )) + radius;
    var dy= (Math.random() - 0.5) * 8; // Can create negative speeds
    var dx = (Math.random() - 0.5) * 8;
    var radius = (Math.random() * 3) + 1;

    circleArray.push(new Circle( x, y, dx, dy, radius));

  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
