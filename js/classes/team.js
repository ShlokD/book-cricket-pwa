import Batsman from './batsman.js';

class Team {
  constructor(name) {
    this.name = name;
    this.players = [];
    for(let i = 1; i <= 11; ++i) {
      this.players.push(new Batsman(`Player ${i}`));
    }

    this.runs = 0;
    this.wickets = 0;

    this.loseWicket = this.loseWicket.bind(this);
    this.startInnings = this.startInnings.bind(this);
    this.padUp = this.padUp.bind(this);
    this.addRuns = this.addRuns.bind(this);
    this.switchBatsmen = this.switchBatsmen.bind(this);
    this.isAllOut = this.isAllOut.bind(this);
  }

  startInnings() {
    this.onStrikeBatsman = this.players[0];
    this.offStrikeBatsman = this.players[1];
    this.nextBatsman = 2;

    this.onStrikeBatsman.setOnStrike();
    this.offStrikeBatsman.setOffStrike();
    this.padUp();
  }

  padUp() {
    this.paddedUp = this.players[this.nextBatsman];
  }

  addRuns(runs) {
    this.runs += runs;
    this.onStrikeBatsman.addRuns(runs);
  }

  loseWicket() {
    this.wickets++;
    this.onStrikeBatsman.setOut();
    if(this.isAllOut()) {
      return;
    }

    this.onStrikeBatsman = this.paddedUp;
    this.onStrikeBatsman.setOnStrike();
    this.nextBatsman++;
    this.padUp();
  }

  switchBatsmen() {
    this.onStrikeBatsman.setOffStrike();
    this.offStrikeBatsman.setOnStrike();

    const temp = this.onStrikeBatsman;
    this.onStrikeBatsman = this.offStrikeBatsman;
    this.offStrikeBatsman = temp;
  }

  isAllOut() {
    return this.wickets === 10;
  }
}

export default Team;