import P5 from 'p5';
import Game from './game';
import Ball from './ball';

export const PLATFORM_WIDTH = 80;
export const PLATFORM_HEIGHT = 10;
export const EXTRA = 5;

export default class Opponent {
  p5: P5;
  width = PLATFORM_WIDTH;
  height = PLATFORM_HEIGHT;
  x = 600 / 2 - PLATFORM_WIDTH / 2;
  y = 150 - PLATFORM_HEIGHT;
  velocity = 0;
  game: Game;

  constructor(p5: P5, game: Game) {
    this.p5 = p5;
    this.game = game;
  }

  bounce(ball: Ball) {
    if (
      ball.position.y <= this.y + PLATFORM_HEIGHT &&
      ball.position.y >= this.y + PLATFORM_HEIGHT - 8 &&
      ball.position.x + ball.size + EXTRA >= this.x && 
      ball.position.x - EXTRA <= this.x + PLATFORM_WIDTH  
    ) {
      const middle = (this.x + PLATFORM_WIDTH / 2);
      const angle = (ball.position.x < middle ? 250 : 300);
      const speed = this.game.score.getBallSpeed();
      ball.velocity = P5.Vector.fromAngle(-this.p5.radians(angle), speed);
      this.game.score.add(1);
      return true;
    }
    return false;
  }

  move() {
    if (this.x > this.p5.width - PLATFORM_WIDTH || this.x < 0)  {
      this.velocity *= -1;
    }
    this.x += this.velocity * this.game.score.getPlayerSpeed();
  }

  spawn() {
    this.x = 600 / 2 - this.width / 2;
    this.velocity = 0;
    this.p5.rect(this.x, this.y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
  }

  render() {
    if (!this.game.isPlaying) return this.spawn();
    this.p5.rect(this.x, this.y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
    this.move();
  }

  moveRight() {
    if (this.x > 0) this.velocity = 1;
  }

  moveLeft() {
    if (this.x < this.p5.width - PLATFORM_WIDTH) this.velocity = -1;
  }

  stop() {
    this.velocity = 0;
  }
}