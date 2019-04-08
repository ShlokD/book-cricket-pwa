import Match from '../../js/classes/match';

describe("Match", () => {
  let match;
  beforeEach(() => {
    match = new Match('Jams', 'Jellies');
  });

  test('it sets up teams', () => {
    expect(match.teamA.name).toEqual('Jams');
    expect(match.teamB.name).toEqual('Jellies');
  });

  describe('startMatch', () => {
    beforeEach(() => {
      match.start();
    });

    it('sets batting and fielding teams', () => {
      expect(match.battingTeam.name).toEqual('Jams');
      expect(match.fieldingTeam.name).toEqual('Jellies');
    });

    it('sets overs', () => {
      expect(match.overs).toEqual(0)
    });

    it('sets balls', () => {
      expect(match.balls).toEqual(0);
    });

    it('sets innings', () => {
      expect(match.innings).toEqual('first');
    });

    test('it sets batsmen', () => {
      expect(match.battingTeam.onStrikeBatsman.name).toEqual('Player 1');
      expect(match.battingTeam.offStrikeBatsman.name).toEqual('Player 2');
    })

    describe('nextBall', () => {
      beforeEach(() => {
        match.getRuns = () => {}
      });

      test('it adds balls', () => {
        match.nextBall();
        expect(match.balls).toEqual(1);
      });

      describe('after 6 balls', () => {
        beforeEach(() => {
          for(let i = 1; i <=6; ++i) {
            match.nextBall();
          }
        });

        test('it sets overs and resets balls', () => {
          expect(match.overs).toEqual(1);
          expect(match.balls).toEqual(0);
        })

        test('it swaps batsmen', () => {
          expect(match.battingTeam.onStrikeBatsman.name).toEqual('Player 2');
          expect(match.battingTeam.offStrikeBatsman.name).toEqual('Player 1');
        })
      });

      describe('after 5 overs, it switches innings', () => {
        beforeEach(() => {
          for(let i = 1; i <=30; ++i) {
            match.nextBall();
          }
        });

        test('it resets overs and balls', () => {
          expect(match.overs).toEqual(0);
          expect(match.balls).toEqual(0);
        });
        
        test('it starts second innings', () => {
          expect(match.innings).toEqual('second');
        })

        test('it swaps batting and fielding teams', () => {
          expect(match.battingTeam.name).toEqual('Jellies');
          expect(match.fieldingTeam.name).toEqual('Jams')
        });
      });
    });

    describe('applyRuns', () => {
      describe('for run = 0', () => {
        beforeEach(() => {
          match.getRuns = () => 0;
          match.applyRuns();
        });

        test('it sets batting teams wickets', () => {
          expect(match.battingTeam.wickets).toEqual(1);
        });

        test('it sets batting teams next player', () => {
          expect(match.battingTeam.onStrikeBatsman.name).toEqual('Player 3');
        });
      });

      describe('for runs other than 0', () => {
        beforeEach(() => {
          match.getRuns = () => 6;
          match.applyRuns();
        });

        test('it sets batting teams runs', () => {
          expect(match.battingTeam.runs).toEqual(6);
        });
      });
    });
  });
});