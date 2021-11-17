class Sprite {
  constructor(name, size, pauseFrames) {
    this.animation = [];
    this.reiteration = pauseFrames ?? 10;
    loadImage(`sprites/${name}.png`, spritesheet => {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          this.animation.push(spritesheet.get(size.x*i, size.y*j, size.x, size.y));
        }
      }
    });
  }

  render(x, y) {
    const frame = Math.floor(frameCount % (this.animation.length * this.reiteration) / this.reiteration);
    image(this.animation[frame], x, y);
  }
}