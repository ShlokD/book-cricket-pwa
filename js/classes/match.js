import Team from './team.js';

export default class {
  constructor(teamA, teamB) {
    this.teamA = new Team(teamA);
    this.teamB = new Team(teamB);

    this.possibleRuns = [0, 2, 4, 6];

    this.ended = false;
  }

  start() {
    this.startFirstInnings();
  }

  getInnings() {
    return this.innings;
  }

  startFirstInnings() {
    this.innings = "first";
    this.battingTeam = this.teamA;
    this.overs = 0;
    this.balls = 0;

    this.teamA.startInnings();
  }

  startSecondInnings() {
    this.innings = "second";
    this.battingTeam = this.teamB;
    this.overs = 0;
    this.balls = 0;
    this.teamB.startInnings();
  }

  endInnings() {
    this.firstInningsEnded = true;
  }

  getRuns() {
    const run = this.possibleRuns[Math.floor(Math.random()*this.possibleRuns.length)];
    if(run === 0) {
      this.battingTeam.loseWicket();
    } else {
      this.battingTeam.addRuns(run);
    }
  }

  checkSecondTeamWon() {
    if(this.innings === "second" && this.teamB.runs > this.teamA.runs) {
      this.endMatch()
    }
  }

  getNextBallState() {
    this.balls++;
    this.getRuns();
    if (this.balls === 6) {
      this.overs++;
      this.balls = 0;
    }
  }
  nextBall() {
    if (this.innings === 'first') {
      if (this.firstInningsEnded) {
        this.startSecondInnings();
      } else {
        this.getNextBallState();
        if (this.overs === 1) {
          this.endInnings();
        }
      }

    }

    if (this.innings === 'second') {
      if (this.ended) {
        this.getWinner()
      } else {
        this.getNextBallState();
        this.checkSecondTeamWon();
        if (this.overs === 1) {
          this.endMatch();
        }
      }
    }
  }

  endMatch() {
    this.ended = true;
  }

  getWinner() {
    if(this.teamA.runs !== this.teamB.runs) {
      return this.teamA.runs > this.teamB.runs ? this.teamA.name : this.teamB.name;
    } else if (this.teamA.wickets !== this.teamB.wickets) {
      return this.teamA.wickets < this.teamB.wickets ? this.teamA.name : this.teamB.name;
    } else {
      return 'Match tied'
    }
  }
}
