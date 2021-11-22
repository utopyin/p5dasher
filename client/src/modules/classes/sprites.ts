import P5 from 'p5';

export default class sprite {
  animation: Array<P5.Image>;
  reiteration: number;
  p5: P5;
  size: {x: number, y: number} = {x: 15, y: 15};
  constructor(p5: P5, name: string, pauseFrames?: number) {
    this.p5 = p5;
    this.animation = [];
    this.reiteration = pauseFrames ?? 10;
    p5.loadImage(`sprites/ball/${name}.png`, (spritesheet: P5.Image) => {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          this.animation.push(spritesheet.get(this.size.x*i, this.size.y*j, this.size.x, this.size.y));
        }
      }
    });
  }

  render(x: number, y: number) {
    const frame = Math.floor(this.p5.frameCount % (this.animation.length * this.reiteration) / this.reiteration);
    this.p5.image(this.animation[frame], x, y);
  }
}

export class BallSprite extends sprite {
  size: {x: number, y: number} = {x: 15, y: 15};
}

export class PlatformSprite extends sprite {
  size: {x: number, y: number} = {x: 80, y: 10};
}

export interface ISprites {
  ball: {
    default: BallSprite;
  }
  platform: {
    default: PlatformSprite;
  }
}

export interface ISpritesBase {
  ball: {
    default?: BallSprite;
  }
  platform: {
    default?: PlatformSprite;
  }
}

export const ballSpriteNames: Array<keyof ISprites['ball']> = ['default']