let angles = [];
const spacing = 40; // Increase the spacing between lines
const lineLength = 20; // Increase the length of the lines

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize all angles and adjust spacing
  for (let i = 0; i < width; i += spacing) {
    angles[i] = [];
    for (let j = 0; j < height; j += spacing) {
      angles[i][j] = 0;
    }
  }
}

function draw() {
  background(240);

  // Display and update angles to simulate wind
  for (let i = 0; i < angles.length; i += spacing) {
    for (let j = 0; j < angles[i].length; j += spacing) {
      push();
      translate(i, j);
      rotate(angles[i][j]);
      stroke(0);
      line(0, 0, lineLength, 0); // Increase line length
      pop();

      // Update the angle to simulate movement
      angles[i][j] += 0.01;
    }
  }
}