let game;
let ballSprite;
const DEFAULT_FRAME_RATE = 60

function preload() {
  ballSprite = new Sprite('ball', {x: 15, y: 15}, 10);
}

function setup() {
  frameRate(DEFAULT_FRAME_RATE);
  createCanvas(600, 600).parent('game');
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