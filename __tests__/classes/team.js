import Team from '../../js/classes/team'

describe("Team", () => {
  let team;
  beforeEach(() => {
    team = new Team('Shaitans');
  });

  describe("constructor", () => {
    test('it sets team name', () => {
      expect(team.name).toEqual('Shaitans');
    });

    test('it has 11 players', () => {
      expect(team.players.length).toEqual(11);
    });

    
    test('it has 0 runs', () => {
      expect(team.runs).toEqual(0);
    });

    
    test('it has 0 wickets', () => {
      expect(team.wickets).toEqual(0);
    });
  });

  describe('startInnings', () => {
    beforeEach(() => {
      team.startInnings();
    })

    test('it sets batsman on strike', () => {
      expect(team.onStrikeBatsman.name).toEqual('Player 1');
      expect(team.onStrikeBatsman.onStrike).toEqual(true);
    });

    test('it sets batsman off strike', () => {
      expect(team.offStrikeBatsman.name).toEqual('Player 2');
      expect(team.offStrikeBatsman.onStrike).toEqual(false);
    });

    test('it sets padded up batsman', () => {
      expect(team.paddedUp.name).toEqual('Player 3');
      expect(team.paddedUp.onStrike).toEqual(false);
    });

    describe('addRuns', () => {
      beforeEach(() => {
        team.addRuns(4);
      });

      it('adds runs to score', () => {
        expect(team.runs).toEqual(4);
        expect(team.onStrikeBatsman.runs).toEqual(4);
      });
    });

    describe("loseWicket", () => {
      beforeEach(() => {
        team.loseWicket(); 
      })

      it('sets wickets', () => {
        expect(team.wickets).toEqual(1);
      })
      
      it('sets current batsman to out', () => {
        expect(team.players[0].out).toEqual(true);
      });
  
      it('sets onstrike batsman as next player', () => {
        expect(team.onStrikeBatsman.name).toEqual('Player 3');
      })
  
      it('pads up next player', () => {
        expect(team.paddedUp.name).toEqual('Player 4');
      })
    });


    describe('switch batsman', () => {
      beforeEach(() => {
        team.switchBatsmen();
      })

      test('it switches on and off strike batsmen', () => {
        expect(team.onStrikeBatsman.name).toEqual('Player 2');
        expect(team.offStrikeBatsman.name).toEqual('Player 1');
      })

      test('it switches onStrike and offStrike for batsmen', () => {
        expect(team.players[0].onStrike).toEqual(false);
        expect(team.players[1].onStrike).toEqual(true);
      });
    });

    describe('applyAllOutCheck', () => {
      beforeEach(() => {
        for(let i = 1; i <= 10; ++i) {
          team.loseWicket();
        }
      });
      test('it sets team to all out if all wickets have fallen', () => {
        expect(team.wickets).toEqual(10);
        expect(team.isAllOut()).toEqual(true);
      });
    });
  });

 


})