let lasers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(0);
}

function draw() {
  background(0);

  for (let i = lasers.length - 1; i >= 0; i--) {
    let l = lasers[i];
    l.show();
    l.update();

    if (l.isOffscreen()) {
      lasers.splice(i, 1);
    }
  }

  if (mouseIsPressed) {
    let color = randomPastelColor();
    let width = random(2, 50);
    let laser = new Laser(mouseX, mouseY, color, width);
    lasers.push(laser);
  }
}

function randomPastelColor() {
  let r = Math.floor(Math.random() * 128 + 128);
  let g = Math.floor(Math.random() * 128 + 128);
  let b = Math.floor(Math.random() * 128 + 128);
  return "#" + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
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

    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }

    this.vel.mult(0.99);
  }

  show() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.width, this.width);
  }

  isOffscreen() {
    return (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height);
  }
}
