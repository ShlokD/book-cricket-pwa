export default class {
  constructor(name) {
    this.name = name;
    this.runs  = 0;
    this.onStrike = false;
    this.out = false;

    this.addRuns = this.addRuns.bind(this);
    this.setOnStrike = this.setOnStrike.bind(this);
    this.setOffStrike = this.setOffStrike.bind(this);
    this.setOut = this.setOut.bind(this);
 }

  addRuns(runs) {
    this.runs += runs;
  }

  setOnStrike() {
    this.onStrike = true;
  }

  setOffStrike() {
    this.onStrike = false;
  }

  setOut() {
    this.out = true;
  }
}