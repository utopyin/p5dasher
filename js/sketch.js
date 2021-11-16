let game;

function setup() {
  createCanvas(600, 600).parent('game');
  game = new Game();
}

function keyPressed() {
  switch (keyCode) {
    case 68:
      game.platform.moveRight();
      break;
    case 81:
      game.platform.moveLeft();
      break;
    case 27:
      game.stop();
      break;
  }
}

function draw() {
  background(20);
  game.update();
}