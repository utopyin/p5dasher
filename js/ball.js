function Ball() {
  this.size = 15;
  this.position = new createVector(width/2, height/2-150);
  this.velocity = new createVector(0, 0);

  this.spawn = function() {
    this.position = new createVector(width/2, height/2-150);
    ellipse(this.position.x, this.position.y, this.size);
    aim();
  }

  this.throw = function(x, y) {
    console.log(game.score.getBallSpeed())
    this.velocity = createVector(x-(width/2), y-(height/2-150)).normalize().mult(game.score.getBallSpeed());
    this.render();
  }

  this.move = function() {
    this.position.add(this.velocity);
    if (this.isBouncing()) {
      const middle = (game.platform.x + platformWidth / 2);
      const angle = this.position.x < middle ? 250 : 300;
      const speed = game.score.getBallSpeed();
      this.velocity = p5.Vector.fromAngle(radians(angle), speed);
      game.score.add(1);
      return;
    }

    if ((this.position.x > width) || (this.position.x < 0)) {
      this.velocity.x = this.velocity.x * -1;
    }
    if ((this.position.y > height) || (this.position.y < 0)) {
      this.velocity.y = this.velocity.y * -1;
    }
  }

  this.isBouncing = function() {
    return (
      this.position.y + 5 > height - 150 &&
      this.position.y + 5 < height - 142 &&
      this.position.x + 10 >= game.platform.x && 
      this.position.x - 10 <= game.platform.x + platformWidth
    )
  }

  this.render = function(isPlaying) {
    if (!isPlaying) return this.spawn();
    this.move();
    ellipse(this.position.x, this.position.y, 15);
  }

  this.isInRedZone = function() {
    if (this.position.y > height-150 && (this.position.x <= 0 || this.position.x >= width || this.position.y >= height)) {
      return true
    };
  }
}

function aim() {
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(width/2, height/2-150, mouseX, mouseY);
  strokeWeight(0);
  drawingContext.setLineDash([]);
}