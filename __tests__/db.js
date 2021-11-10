const db = require('../models/userModels');


 describe('Database unit tests', () => {

  beforeAll((done) => {
    fs.writeFile(testJsonFile, JSON.stringify([]), () => {
      db.reset();
      done();
    });
  });

  afterAll((done) => {
    fs.writeFile(testJsonFile, JSON.stringify([]), done);
  });

  describe('#sync', () => {
    it('writes a valid marketList to the JSON file', () => {
      const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];
      const result = db.sync(marketList);
      expect(result).not.toBeInstanceOf(Error);
      const table = JSON.parse(fs.readFileSync(testJsonFile));
      expect(table).toEqual(marketList);
    });

    // TODO: Finish unit testing the sync function

    it('overwrites previously existing markets', () => {   
      const marketList = [{ location: 'poopoo', cards: 10 }, { location: 'peepee', cards: 5 }];
      const result = db.sync(marketList);
      const existing = db.find();
      expect(result).not.toBeInstanceOf(Error);
      expect(result).toEqual(existing);

    });

    it('returns an error when location and/or cards fields are not provided', () => {
      const marketList1 = [{ location: undefined, cards: 10 }, { location: ' ', cards: 5 }];
      const marketList2 = [{ location: 'poo', cards: undefined }, { location: 'pee', cards: 10 }];
      const marketList3 = [{ location: 'poo', cards: undefined }, { location: undefined, cards: undefined }];
      
      const result1 = db.sync(marketList1);
      expect(result1).toBeInstanceOf(Error);
      
      const result2 = db.sync(marketList2);
      expect(result2).toBeInstanceOf(Error);

      const result3 = db.sync(marketList3);
      expect(result3).toBeInstanceOf(Error);
      // console.log(result);
      
    });

    /**
     *  TODO: Type validation is not yet correctly implemented! Follow the TDD
     *  (test driven development) approach:
     *    1. Write a test describing the desired feature (db.sync returns a
     *      TypeError when the types are wrong)
     *    2. Confirm that your tests fail
     *    3. Follow the errors to implement your new functionality
     */
    it('returns an error when location value is not a string', () => {
      const marketList = [{ location: [], cards: 10 }, { location: {}, cards: 5 }, { location: true, cards: 7 }, { location: 123, cards: 15 }];
      const result = db.sync(marketList);
      expect(result).toBeInstanceOf(Error);
    });

    it('returns an error when cards value is not a number', () => {
      const marketList = [{ location: 'cake', cards: {} }, { location: 'foo', cards: [] }, { location: 'test', cards: true }, { location: 'string', cards: 'five' }];
      const result = db.sync(marketList);
      expect(result).toBeInstanceOf(Error);
    });
  });

  // Extension TODO: Unit test the #find and #drop functions
  describe('#find', () => {
    it('returns list of all markets from the json file', () => {
      const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];
      db.sync(marketList);

      const result = db.find();
      expect(result).toEqual(marketList);
      
    });

    it('works if the list of markets is empty', () => {
      const marketList = [];
      db.sync(marketList);

      const result = db.find();
      expect(result).toEqual(marketList);
    });
  });

  describe('#drop', () => {
    it('writes an empty array to the json file', () => {
      const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];
      db.sync(marketList);
      db.drop();
      
      const result = db.find();
      expect(result).toEqual([]);
    });
  });
});
