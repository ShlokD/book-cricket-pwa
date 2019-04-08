import Match from "../classes/match.js";

export default class {
  constructor() {
    this.teamA = document.querySelector('#name-team-a');
    this.teamB = document.querySelector("#name-team-b");

    this.scoreA = document.querySelector("#score-team-a");
    this.scoreB = document.querySelector("#score-team-b");

    this.oversA = document.querySelector("#overs-team-a");
    this.oversB = document.querySelector("#overs-team-b");

    this.winnerEl = document.querySelector("#winner");

    this.play = document.querySelector("#play");

    this.match = new Match(this.teamA.textContent, this.teamB.textContent);

    this.setNext = this.setNext.bind(this);
  }

  setNext() {
    if(!this.match.ended) {
      this.match.nextBall();

      const scoreEl = this.match.getInnings() === 'first' ? this.scoreA : this.scoreB;
      const oversEl = this.match.getInnings() === "first" ? this.oversA : this.oversB;
      const team = this.match.battingTeam;
      const score = `${team.runs}/${team.wickets}`;
      const overs = `${this.match.overs}.${this.match.balls}`
  
      scoreEl.textContent = score;
      oversEl.textContent = overs;
    } else {
      this.winnerEl.textContent = `Winner: ${this.match.getWinner()}`
    }
  
  }

  start() {
    this.match.start();
    this.play.addEventListener('click', () => this.setNext());
  }
}