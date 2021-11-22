import P5 from 'p5';
import Game from './game';
import Ball from './ball';

export const PLATFORM_WIDTH = 80;
export const PLATFORM_HEIGHT = 10;
export const EXTRA = 5

export default class Player {
  p5: P5;
  width = PLATFORM_WIDTH;
  height = PLATFORM_HEIGHT;
  x = 600 / 2 - PLATFORM_WIDTH / 2;
  y;
  velocity = 0;
  game: Game;

  constructor(p5: P5, game: Game) {
    this.p5 = p5;
    this.game = game;
    this.y = p5.height - 150;
  }

  bounce(ball: Ball) {
    if (
      ball.position.y + ball.size >= this.y &&
      ball.position.y + ball.size <= this.y + 8 &&
      ball.position.x + ball.size + EXTRA >= this.x && 
      ball.position.x - EXTRA <= this.x + this.width
    ) {
      const middle = (this.x + this.width / 2);
      const angle = (ball.position.x < middle ? 250 : 300);
      const speed = this.game.score.getBallSpeed();
      ball.velocity = P5.Vector.fromAngle(this.p5.radians(angle), speed);
      this.game.score.add(1);
      return true;
    }
    return false;
  }

  move() {
    if (this.x > this.p5.width - this.width || this.x < 0)  {
      this.velocity *= -1;
    }
    this.x += this.velocity * this.game.score.getPlayerSpeed();
  }

  spawn() {
    this.x = 600 / 2 - this.width / 2;
    this.velocity = 0;
    this.p5.rect(this.x, this.y, this.width, this.height);
  }

  render() {
    if (!this.game.isPlaying) return this.spawn();
    this.p5.rect(this.x, this.y, this.width, this.height);
    this.move();
  }

  moveRight() {
    if (this.x > 0) this.velocity = 1;
  }

  moveLeft() {
    if (this.x < this.p5.width - this.width) this.velocity = -1;
  }

  stop() {
    this.velocity = 0;
  }
}