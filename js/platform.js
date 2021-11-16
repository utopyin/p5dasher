let width = 600;
let height = 600;
const platformWidth = 80;

function Platform() {
  this.width = platformWidth;
  this.x = 600 / 2 - this.width / 2;
  this.velocity = 0;

  this.move = function() {
    if (this.velocity && this.x >= width - platformWidth)  {
      this.velocity = -1;
    } else if (this.velocity && this.x <= 0) {
      this.velocity = 1;
    }
    this.x = constrain(this.x + this.velocity*10, 0, width - this.width);
  }

  this.update = function() {
    rect(this.x, height-150, this.width, 10);
    this.move();
  }

  this.moveRight = function() {
    this.velocity = 1;
  }

  this.moveLeft = function() {
    this.velocity = -1;
  }

  this.stop = function() {
    this.velocity = 0;
  }
}