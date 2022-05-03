import chai from 'chai';
import db from '../../models';

const should = chai.should();

describe('Database models', () => {
    it('should include User model', () => {
        should.exist(db.User);
    });

});