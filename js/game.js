function Game() {
  this.platform = new Platform();

  this.start = function() {
    this.platform.velocity = 1;
  };

  this.stop = function() {
    this.platform.stop();
  }

  this.update = function() {
    this.platform.update();
  }
}