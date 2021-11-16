let game;

function setup() {
  createCanvas(600, 600).parent('game');
  stroke("white");
  strokeWeight(0);
  game = new Game();
  game.score.displayHighestScore();
}

function mousePressed(e) {
  if (e.button == 0 && !game.isPlaying) {
    game.start();
  }
}

function keyPressed() {
  switch (keyCode) {
    case 68:
      if (game.isPlaying) game.platform.moveRight();
      break;
    case 81:
      if (game.isPlaying) game.platform.moveLeft();
      break;
    case 27:
      if (game.isPlaying) game.stop();
      break;
  }
}

function draw() {
  background(20);
  game.update();
}