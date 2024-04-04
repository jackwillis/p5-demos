const xSpacing = 27;
const ySpacing = 21;
const lineLength = 17;

/**
 * @typedef {Object} Figure - A figure in the wind.
 * @property {number} angle - The angle of the figure, in radians.
 * @property {number} xOffset - The x offset of the figure, in pixels.
 * @property {number} yOffset - The y offset of the figure, in pixels.
 */

/**
 * @type {Figure[][]}
 */
let figures = [];

/** The last alpha (transparency) value used to render a figure. */
let lastAlpha = 0;

function setup() {
  createCanvas(windowWidth / 8, windowHeight / 8);
  noSmooth();

  for (let x = 0; x < width; x += xSpacing) {
    figures[x] = [];
    for (let y = 0; y < height; y += ySpacing) {
      figures[x][y] = {
        angle: 0,
        xOffset: 0,
        yOffset: 0
      };
    }
  }
}

function draw() {
  colorMode(HSL, 360, 90, 190);

  if (Math.random() - Math.pow(Math.cos(millis()/2000 - 0.4), 3)*0.7 > 0.1) {
    background(25);
  }

  strokeCap(SQUARE);

  for (let x = 0; x < figures.length; x += xSpacing) {
    for (let y = 0; y < figures[x].length; y += ySpacing) {
      let figure = figures[x][y];

      const deltaAngularSpeed = 0.01 + Math.cos(millis() / 20000 + Math.sin(millis() / 76544) * 0.4 + 1.1)*0.02 + (Math.random()-0.5)*0.01;

      const rjitter = (Math.random() - 0.5) * 1.5 + Math.log(Math.abs(0.02 / deltaAngularSpeed))*Math.sign(deltaAngularSpeed)*2;
      const thetajitter = (Math.random() - 0.5) * 0.1 + figure.angle;
      const xjitter = rjitter * Math.cos(figure.angle + thetajitter);
      const yjitter = rjitter * Math.sin(figure.angle + thetajitter);

      const lengthJitter = (xjitter + yjitter) * 0.2;
      const strokeWeightJitter = Math.sqrt(Math.abs(xjitter * yjitter));
      const alphaJitter = Math.abs(xjitter - yjitter) * 0.2;

      const hue = map(x, 0, width, 0, 360);
      const alpha = (0.5 + alphaJitter) * 0.25 + lastAlpha * 0.75;
      lastAlpha = alpha;

      strokeWeight(1 + strokeWeightJitter);
      stroke(hue, 100, 100, alpha);

      push();
      translate(x + figure.xOffset, y + figure.yOffset);
      rotate(figure.angle);
      line(0, 0, lineLength + lengthJitter, 0);
      pop();

      figure.angle += deltaAngularSpeed;
      figure.xOffset += (xjitter * 0.005);
      figure.yOffset += (yjitter * 0.005);
    }
  }
}
