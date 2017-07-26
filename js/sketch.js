var noiseScale;
var balloons;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  strokeWeight(2);
  // frameRate(4);
  noiseScale = 0.0;
  balloons = [];
  const length = min(height, width) / 12;
  for (var x = 1; x < width; x += length * 2){
    for (var y = length; y < height; y += length * 2) {
      balloons.push(new Balloon(createVector(x, y), length))
    }
  }
}

function draw() {
  background(255);
  noiseScale += 0.01;
  const length = min(height, width) / 12;
  for (var balloon of balloons) {
    noiseSeed(balloon.noiseSeed);
    var mappedX = map(noise(noiseScale), 0, 1, -length, length);
    balloon.move(createVector(mappedX, 0));
    balloon.draw();
  }
}

function drawShadow(center, windDirection, length, ballSize) {
  var shadowColor = color(160);
  var angle = radians(-30);
  var distance = length * 0.5;
  var shadowTip = createVector(windDirection.x + cos(angle) * distance, sin(angle) * distance);
  stroke(shadowColor);
  fill(shadowColor);
  line(center.x, center.y, shadowTip.x, shadowTip.y);
  ellipse(shadowTip.x, shadowTip.y, ballSize.x, ballSize.y/2);
}

function randomColor() {
  return color(random(256), random(256), random(256));
}

const Balloon = function(stringBase, stringLength) {
  this.stringBase = stringBase;
  this.stringLength = stringLength;
  this.balloonCenter = createVector(0, -stringLength);
  this.balloonSize = createVector(stringLength/2, stringLength/2);
  this.color = randomColor();
  this.noiseSeed = random(100);
}

Balloon.prototype.move = function(windDirection) {
  var angle = windDirection.heading();
  var distance = this.stringBase.dist(windDirection);
  this.balloonCenter = createVector(this.stringBase - cos(angle) * distance, this.balloonCenter.y - sin(angle) * distance);
};

Balloon.prototype.draw = function() {
  push();
  translate(this.stringBase.x, this.stringBase.y);
  drawShadow(createVector(0, 0), this.balloonCenter, this.stringLength, this.balloonSize);
  this.drawBalloon();
  pop();
};

Balloon.prototype.drawBalloon = function() {
  stroke("#333333");
  fill(this.color);
  line(0, 0, this.balloonCenter.x, this.balloonCenter.y);
  ellipse(this.balloonCenter.x, this.balloonCenter.y, this.balloonSize.x, this.balloonSize.y);
  noStroke();
  fill(255, 128);
  ellipse(this.balloonCenter.x - this.balloonSize.x / 6, this.balloonCenter.y - this.balloonSize.y / 6, this.balloonSize.x / 4, this.balloonSize.y / 4);
};