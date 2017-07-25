var noiseScale;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  strokeWeight(2);
  noiseScale = 0.0;
}

function draw() {
  background(255);
  noiseScale += 0.01;
  const length = min(height, width) / 12;
  for (var x = 1; x < width; x += length * 2){
    for (var y = length; y < height; y += length * 2) {
      noiseSeed(sqrt(x*y));
      var mappedX= map(noise(noiseScale), 0, 1, -length/2, length/2);
      var windDirection = createVector(mappedX, length);
      drawPole(createVector(x, y), windDirection, length);
    }
  }
}

function drawPole(center, windDirection, length) {
  push();
  translate(center.x + length / 2, center.y + length / 3);
  var ballSize = createVector(length / 3, length / 3);
  drawShadow(createVector(0, 0), windDirection, length, ballSize);
  drawPin(createVector(0, 0), windDirection, length, ballSize);
  pop();
}

function drawPin(center, windDirection, length, ballSize) {
  stroke(0);
  fill("red");
  var windAngle = atan2(center.y - windDirection.y, center.x - windDirection.x);
  var tip = createVector(center.x + cos(windAngle) * length, center.y + sin(windAngle) * length);
  line(0, 0, tip.x, tip.y);
  ellipse(tip.x, tip.y, ballSize.x, ballSize.y);
  fill(255, 224);
  noStroke();
  ellipse(tip.x - ballSize.x/6, tip.y - ballSize.y/6, ballSize.x/4, ballSize.y/4);
}

function drawShadow(center, windDirection, length, ballSize) {
  var shadowColor = color(160);
  var angle = radians(-30);
  var distance = length * 0.5;
  var shadowTip = createVector(cos(angle) * distance - windDirection.x, sin(angle) * distance);
  stroke(shadowColor);
  fill(shadowColor);
  line(center.x, center.y, shadowTip.x, shadowTip.y);
  ellipse(shadowTip.x, shadowTip.y, ballSize.x, ballSize.y/2);
}

