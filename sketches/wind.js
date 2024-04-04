const spacing = 27;
const lineLength = 17;

let angles = [];

function setup() {
  createCanvas(windowWidth / 8, windowHeight / 8);
  noSmooth();

  for (let i = 0; i < width; i += spacing) {
    angles[i] = [];
    for (let j = 0; j < height; j += spacing) {
      angles[i][j] = 0;
    }
  }
}

function draw() {
  colorMode(HSL, 360, 90, 190);

  if (Math.random() > 0.1) {
    background(0);
  }

  strokeWeight(1);
  strokeCap(SQUARE);

  for (let i = 0; i < angles.length; i += spacing) {
    for (let j = 0; j < angles[i].length; j += spacing) {
      push();

      const xjitter = (Math.random() - 0.5) * 1.5;
      const yjitter = (Math.random() - 0.5) * 1.5;
      translate(i + xjitter, j + (Math.random()-0.5)*1.5);
      rotate(angles[i][j]);

      const hue = map(i, 0, width, 0, 360);
      stroke(hue, 100, 100, 3);
      line(0, 0, lineLength, 0);
      pop();

      const deltaAngularSpeed = 0.01 + Math.cos(millis() / 20000 + Math.sin(millis() / 76544) * 0.4)*0.02 + (Math.random()-0.5)*0.005;

      angles[i][j] += deltaAngularSpeed;
    }
  }
}
