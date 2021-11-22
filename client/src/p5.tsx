import { createRef, useState, useEffect } from 'react';
import P5 from "p5";
import Game from './modules/classes/game';
import { ISprites, ISpritesBase, BallSprite, ballSpriteNames } from './modules/classes/sprites';
import { useWS } from './modules/ws/wsStore';

const DEFAULT_FRAME_RATE = 60;

interface IProps {
  ws?: WebSocket;
}

export default function({ws}: IProps) {
  const renderRef = createRef<HTMLDivElement>();
  const storagePB = localStorage.getItem('@highest');
  const [scores, setScores] = useState({score: 0, pb: storagePB ? parseInt(storagePB) : 0});
  const { conn } = useWS();

  useEffect(() => {
    const sketch = new P5((p5: P5) => {
      let game: Game;
      let sprites: ISpritesBase = {ball: {}, platform: {}};
      
      p5.preload = () => {
        ballSpriteNames.forEach(name => {
          sprites.ball[name] = new BallSprite(p5, name);
        })
      }
      
      p5.setup = () => {
        p5.frameRate(DEFAULT_FRAME_RATE);
        p5.createCanvas(600, 750).parent(renderRef.current as HTMLDivElement);
        p5.strokeWeight(0);
        game = new Game(
          setScores,
          p5,
          sprites as ISprites,
          conn as WebSocket
        );
      }
      
      p5.mousePressed = (e: any) => {
        if (e.button == 0 && !game.isPlaying) {
          game.start();
        }
      }
      
      p5.keyPressed = () => {
        switch (p5.keyCode) {
          case 68:
            if (game.isPlaying) game.right();
            break;
          case 81:
            if (game.isPlaying) game.left();
            break;
          case 27:
            if (game.isPlaying) game.stop();
            break;
        }
      }
      
      p5.draw = () => {
        p5.background(20);
        game.update();
      }
    });
    return () => sketch.remove();
  }, [])

  useEffect(() => {
    localStorage.setItem('@highest', scores.pb.toString());
  }, [scores])

  return (
    <div id="game" ref={renderRef}>
      <div id="scores">
        <h2>Score: {scores.score}</h2>
        <span>Personal best: {scores.pb}</span>
      </div>
    </div>
  )
}