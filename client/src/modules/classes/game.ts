import P5 from 'p5'; 
import Ball from './ball';
import { Component } from 'react';
import Player from './player';
import { ISprites } from './sprites';
import Opponent from './opponent';

const DEFAULT_SCORE = 0;

export default class Game {
  p5; player; ball; score; opponent;
  setState; isPlaying = false; conn;
  
  constructor(
    setState: React.Dispatch<React.SetStateAction<{ score: number; pb: number; }>>,
    p5: P5,
    sprites: ISprites,
    conn: WebSocket
  ) {
    this.setState = setState;
    this.p5 = p5;
    this.player = new Player(p5, this);
    this.opponent = new Opponent(p5, this);
    this.score = new Score(setState);
    this.ball = new Ball(p5, this, sprites.ball.default);
    this.conn = conn;

    conn.addEventListener('message', (message) => {
      if (message.data == 'pong') return;
      switch (JSON.parse(message.data).direction) {
        case 'left':
          this.player.moveLeft();
          this.opponent.moveLeft();
          break;
        case 'right':
          this.player.moveRight();
          this.opponent.moveRight();
          break;
      }
    })
  }

  left() {
    this.conn.send(JSON.stringify({direction: 'left'}));
  }

  right() {
    this.conn.send(JSON.stringify({direction: 'right'}));
  }

  start() {
    this.player.velocity = 1;
    this.opponent.velocity = 1;
    this.isPlaying = true;
    this.ball.throw(this.p5.mouseX, this.p5.mouseY);
  };

  stop() {
    this.score.reset();
    this.player.stop();
    this.isPlaying = false;
  }

  update() {
    this.ball.render();
    this.player.render();
    this.opponent.render();
    if (this.ball.isInRedZone()) this.stop();
  }
}

export class Score {
  score = 0;
  setState;

  constructor(setState: React.Dispatch<React.SetStateAction<{ score: number; pb: number; }>>) {
    this.setState = setState;
  }

  add(amount: number) {
    this.score += amount;
    this.setState(({score, pb}: any) => {
      return score + amount > pb
        ? { score: score + amount, pb: score + amount }
        : { score: score + amount, pb }
    })
  }

  reset() {
    this.score = 0;
    this.setState(({score, pb}: any) => {
      return score > pb
        ? { score: DEFAULT_SCORE, pb: score }
        : { score: DEFAULT_SCORE, pb }
    })
    return DEFAULT_SCORE;
  }

  getBallSpeed() {
    const scoreGaps = [0, 3, 6, 12, 18, 30, 40];
    const speeds = [7, 9, 9.5, 11, 13, 14, 15];
    return speeds.reduce((prev, _acc, i) => {
      return this.score >= scoreGaps[i] ? speeds[i] : prev
    });
  }

  getPlayerSpeed() {
    const scoreGaps = [0, 12, 30];
    const speeds = [5, 8, 11];
    return speeds.reduce((prev, _acc, i) => {
      return this.score >= scoreGaps[i] ? speeds[i] : prev
    });
  }
}