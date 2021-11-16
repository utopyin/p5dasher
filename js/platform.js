const platformWidth = 80;

function Platform() {
  this.width = platformWidth;
  this.x = 600 / 2 - this.width / 2;
  this.velocity = 0;

  this.move = function() {
    if (this.x > width - platformWidth || this.x < 0)  {
      this.velocity *= -1;
    }
    this.x += this.velocity * game.score.getPlatformSpeed();
  }

  this.spawn = function() {
    this.x = 600 / 2 - this.width / 2;
    this.velocity = 0;
    rect(this.x, height-150, this.width, 10);
  }

  this.render = function(isPlaying) {
    if (!isPlaying) return this.spawn();
    rect(this.x, height-150, this.width, 10);
    this.move();
  }

  this.moveRight = function() {
    if (this.x > 0) this.velocity = 1;
  }

  this.moveLeft = function() {
    if (this.x < width - platformWidth) this.velocity = -1;
  }

  this.stop = function() {
    this.velocity = 0;
  }
}