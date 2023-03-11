let lasers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(0);
}

function logWeightedRandom() {
  let sum = 0;
  for (let i = 1; i <= 99; i++) {
    sum += Math.log10(100 / i);
  }
  const rand = Math.random() * sum;
  let acc = 0;
  for (let i = 1; i <= 99; i++) {
    acc += Math.log10(100 / i);
    if (rand < acc) {
      return i;
    }
  }
}

function draw() {
  background(0);

  lasers = lasers.filter((l) => !l.isOffscreen()); // remove offscreen lasers

  lasers.forEach((laser) => {
    laser.show();
    laser.update();
  });

  if (mouseIsPressed) {
    const color = randomPastelColor();
    const width = logWeightedRandom();
    const laser = new Laser(mouseX, mouseY, color, width);
    lasers.push(laser);
  }
}

function randomPastelColor() {
  const r = Math.floor(Math.random() * 128 + 128);
  const g = Math.floor(Math.random() * 128 + 128);
  const b = Math.floor(Math.random() * 128 + 128);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

class Laser {
  constructor(x, y, color, width) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-10, 10), random(-10, 10));
    this.color = color;
    this.width = width;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.99);

    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  show() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.width, this.width);
  }

  isOffscreen() {
    return (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height);
  }
}

