const DEFAULT_SCORE = 0;
function Game() {
  this.platform = new Platform();
  this.ball = new Ball();
  this.isPlaying = false;
  this.score = new Score();

  this.start = function() {
    this.platform.velocity = 1;
    this.isPlaying = true;
    this.ball.throw(mouseX, mouseY);
  };

  this.stop = function() {
    this.score.reset();
    this.platform.stop();
    this.isPlaying = false;
  }

  this.update = function() {
    this.ball.render(this.isPlaying);
    this.platform.render(this.isPlaying);
    if (this.ball.isInRedZone()) this.stop();
  }
}

class Score {
  value = DEFAULT_SCORE;

  add(amount) {
    this.value += amount;
    this.display();
  }

  reset() {
    const highestScore = localStorage.getItem('@highest');
    if (this.value > highestScore) localStorage.setItem('@highest', this.value);
    this.value = DEFAULT_SCORE;
    this.display(DEFAULT_SCORE);
    this.displayHighestScore();
    return DEFAULT_SCORE;
  }

  display(score) {
    document.getElementById('score').innerHTML = `Score : ${score ?? this.value}`;
  }

  displayHighestScore() {
    if (!localStorage.getItem('@highest')) {
      localStorage.setItem('@highest', 0)
    }
    document.getElementById('highest-score').innerHTML = `Highest score ${localStorage.getItem('@highest') ?? 0}`;
  }

  getScore() {
    return this.value;
  }

  getBallSpeed() {
    const scoreGaps = [0, 3, 6, 12, 18, 30, 40];
    const speeds = [7, 9, 9.5, 11, 13, 14, 15];
    return speeds.reduce((prev, acc, i) => {
      return this.value >= scoreGaps[i] ? speeds[i] : prev
    });
  }

  getPlatformSpeed() {
    const scoreGaps = [0, 12, 30];
    const speeds = [5, 8, 11];
    return speeds.reduce((prev, acc, i) => {
      return this.value >= scoreGaps[i] ? speeds[i] : prev
    });
  }
}