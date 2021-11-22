import P5 from 'p5';
import Sprite from './sprites';
import Game from './game';
import { PLATFORM_WIDTH } from './player';

export default class Ball {
  size = 15;
  p5: P5;
  sprite: Sprite;
  position: P5.Vector;
  velocity: P5.Vector;
  game: Game;

  constructor(p5: P5, game: Game, sprite: Sprite) {
    this.game = game;
    this.p5 = p5;
    this.sprite = sprite;
    this.position = p5.createVector(p5.width / 2 - this.size / 2, p5.height / 2 - 150 - this.size / 2);
    this.velocity = p5.createVector(0, 0);
  }

  aim() {
    this.p5.strokeWeight(1);
    this.p5.stroke('white');
    const drawingContext: any = this.p5.drawingContext;
    drawingContext.setLineDash([5, 5]);
    this.p5.line(this.p5.width/2, this.p5.height/2-150, this.p5.mouseX, this.p5.mouseY);
    this.p5.strokeWeight(0);
    drawingContext.setLineDash([]);
  }

  spawn() {
    this.position = this.p5.createVector(this.p5.width / 2 - this.size / 2, this.p5.height / 2 - 150 - this.size / 2);
    this.sprite.render(this.position.x, this.position.y);
    this.aim();
  }

  throw(x: number, y: number) {
    this.velocity = this.p5.createVector(x-(this.p5.width/2), y-(this.p5.height/2-150)).normalize().mult(this.game.score.getBallSpeed());
    this.render();
  }

  move() {
    this.position.add(this.velocity);
    if (!this.game.player.bounce(this) && !this.game.opponent.bounce(this)) {
      if ((this.position.x + this.size >= this.p5.width) || (this.position.x <= 0)) {
        this.velocity.x = this.velocity.x * -1;
      }
      if ((this.position.y + this.size >= this.p5.height) || (this.position.y <= 0)) {
        this.velocity.y = this.velocity.y * -1;
      }
    }
  }

  render() {
    if (!this.game.isPlaying) return this.spawn();
    this.sprite.render(this.position.x, this.position.y);
    this.move();
  }

  isInRedZone() {
    // bottom zone
    if (
      this.position.y >= this.game.player.y &&
      ( 
        this.position.x <= 0 ||
        this.position.x + this.size >= this.p5.width ||
        this.position.y + this.size >= this.p5.height
      )
    ) {
      return true;
    }
    
    // top zone
    else if (
      this.position.y - this.size <= this.game.opponent.y &&
      ( 
        this.position.x <= 0 ||
        this.position.x + this.size >= this.p5.width ||
        this.position.y <= 0
      )
    ) return true;

    return false;
  }
}