import Batsman from '../../js/classes/batsman';

describe("Batsman", () => {
  let batsman;

  beforeEach(() => {
    batsman = new Batsman('Player 1');
  });

  describe("constructor", () => {
    test('it sets the batsman name', () => {
      expect(batsman.name).toEqual('Player 1');
    });

    test('it sets the batsman off strike', () => {
      expect(batsman.onStrike).toEqual(false);
    });

    test('it sets batsman as not out', () => {
      expect(batsman.out).toEqual(false);
    });

    test('it sets runs as 0', () => {
      expect(batsman.runs).toEqual(0);
    });
  });

  describe('addRuns', () => {
    test('it adds runs to the batsmans', () => {
      batsman.addRuns(4);
      expect(batsman.runs).toEqual(4);
    });
  });

  describe('setOnStrike', () => {
    test('sets batsman on strike', () => {
      batsman.setOnStrike();
      expect(batsman.onStrike).toEqual(true);
    });
  });

  describe('setOffStrike', () => {
    test('sets batsman off strike', () => {
      batsman.setOffStrike();
      expect(batsman.onStrike).toEqual(false);
    });
  });

  describe('setOut', () => {
    test('sets batsman as out', () => {
      batsman.setOut();
      expect(batsman.out).toEqual(true);
    });
  });
})