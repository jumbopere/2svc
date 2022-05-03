/* eslint no-unused-expressions: 0 */
/* eslint import/no-unresolved: 0 */
// import 'babel-polyfill';
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import fakerObj from './helpers/authHelper';

const { expect } = chai;
const request = supertest(app);

describe('usersControllersTest', () => {
  describe('Registering a new user', () => {
    after((done) => {
        app.close(done);
      });
    it('returns 201 response on successful user registration', (done) => {
      request
        .post('/v1/user/register')
        .send(fakerObj.user)
        .end((err, res) => {
          expect(res.body.userObj.email).to.equal(fakerObj.user.email);
        });
        done();
    });
    it('returns (409 error) for duplicate email', (done) => {
      request
        .post('/v1/user/register')
        .send(fakerObj.user)
        .end((err, res) => {
          expect(res.body.status).to.equal(409);
          done();
        });
    });
    it(
      'returns 400 error if the first name field is empty', 
      (done) => {
        request
          .post('/v1/user/register')
          .send(fakerObj.wrongUser)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(400);
            done();
          });
      }
    );
    it(
      'returns 400 error if last name field is empty', 
      (done) => {
        request
          .post('/v1/user/register')
          .send(fakerObj.wrongUser2)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(400);
            done();
          });
      }
    );
    it(
      'returns 400 error if the email field is empty', 
      (done) => {
        request
          .post('/v1/user/register')
          .send(fakerObj.wrongUser3)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(400);
            done();
          });
      }
    );
   
    it(
      'returns 400 error if the password field is empty', 
      (done) => {
        request
          .post('/v1/user/register')
          .send(fakerObj.wrongUser5)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(400);
            done();
          });
      }
    );
    it(
        'returns 400 error if the email field is not lowercase', 
        (done) => {
          request
            .post('/v1/user/register')
            .send(fakerObj.wrongUser4)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(400);
              done();
            });
        }
      );
  });
});