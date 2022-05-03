import db from "../../models";
import userData from '../helpers/userHelper'


const { user } = userData;

describe('User model', () => {
  it('should create a user', (done) => {
    db.User.create(user.demoUser).then((createdUser) => {
      createdUser.firstName.should.equal(user.demoUser.firstName);
      createdUser.lastName.should.equal(user.demoUser.lastName);
      createdUser.email.should.equal(user.demoUser.email);
     
      done();
    });
  });
  it('should not create a user if firstname is empty', (done) => {
    db.User.create(user.demoUser2).then().catch((error) => {
      error.errors[0].message.should.equal('Firstname can not be empty');
    done();
    });
  });

  it('should not create a user if lastname is empty', (done) => {
    db.User.create(user.demoUser3).then().catch((error) => {
        error.errors[0].message.should.equal('Lastname can not be empty');
    done();
    });
  });
  it('should not create a user if user password is shorter than 8 character', (done) => {
    db.User.create(user.demoUser4).then().catch((error) => {
      error.errors[0].message.should.equal('Your password is too short');
      done();
    });
  });
  it('should not create a user if email is wrong', (done) => {
    db.User.create(user.demoUser5).then().catch((error) => {
      error.errors[0].message.should.equal('Email address must be valid');
      done();
    });
  });

});
