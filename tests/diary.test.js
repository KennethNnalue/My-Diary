import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import server from '../API/server';
import models from '../API/models';
import decodeToken from '../API/security/decodeToken';

const { User, Memory } = models;

chai.should();

chai.use(chaiHttp);

const loginUrl = '/api/v1/login';
const signupUrl = '/api/v1/signup';
const createMemoryUrl = '/api/v1/memories';

const anotherUserWallet = {};
const userWallet = {};

it('intro API route works', (done) => {
  chai
    .request(server)
    .get('/api/v1')
    .end((error, response) => {
      response.should.have.status(200);
      response.body.should.to.eql({
        message: 'Welcome to My Diary API',
        status: 'success',
      });
      done();
    });
});

it('home page should display', (done) => {
  chai
    .request(server)
    .get('/')
    .end((error, response) => {
      response.should.have.status(200);
      response.headers['content-type'].should.eql('text/html; charset=UTF-8');
      done();
    });
});

/**
 * FOR SIGNUP TESTS
 */
describe('SIGN ~ UP', () => {
  it('cannot signup with invalid name, email or password', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.eql({
          errors: {
            email: [
              {
                message: 'Please provide a valid email',
              },
              {
                message: 'Expected a string but received a undefined',
              },
            ],
            name: [
              {
                message: 'Please provide a name',
              },
              {
                message: 'Name must contain only letters',
              },
            ],
            password: [
              {
                message: 'Please enter password',
              },
              {
                message: 'Your password must be at least 8 characters',
              },
              {
                message: 'Your password must contain a letter and a number',
              },
            ],
          },
        });
        done();
      });
  });

  it('can sign up with valid user info, (email, password & name)', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'augustineezinwa@gmail.com',
        password: 'fishdonkey99',
        name: 'Augustine',
      })
      .end(async (request, response) => {
        response.status.should.eql(201);
        response.body.token.should.be.a('string');
        userWallet.token = response.body.token;

        // check for user in DB
        const user = await User.findOne({
          where: {
            email: 'augustineezinwa@gmail.com',
          },
        });
        userWallet.id = user.id;
        expect(user.name).eql('Augustine');
        done();
      });
  });

  it('can sign up another user', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'emeka@gmail.com',
        password: 'fishdonkey99',
        name: 'emeka',
      })
      .end(async (request, response) => {
        response.status.should.eql(201);
        response.body.token.should.be.a('string');
        anotherUserWallet.token = response.body.token;

        // check for user in DB
        const user = await User.findOne({
          where: {
            email: 'emeka@gmail.com',
          },
        });
        anotherUserWallet.id = user.id;
        expect(user.name).eql('emeka');
        done();
      });
  });

  it('test token ushered during signup is valid', (done) => {
    const tokenPacket = decodeToken(userWallet.token);
    userWallet.id.should.eql(tokenPacket.id);
    done();
  });

  it('cannot signup with an already existing email', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'augustineezinwa@gmail.com',
        password: 'fishdonkey99',
        name: 'Augustine',
      })
      .end((request, response) => {
        response.body.should.eql({
          errors: {
            email: [{ message: 'email already exists' }],
          },
        });
        response.status.should.eql(422);
        done();
      });
  });
});

/**
 * FOR LOGIN TESTS
 */
describe('LOGIN ~', () => {
  it('should not login with empty email or password', (done) => {
    chai
      .request(server)
      .post(loginUrl)
      .end((request, response) => {
        response.status.should.eql(422);
        response.body.should.eql({
          errors: {
            email: [{ message: 'Please enter email' }],
            password: [{ message: 'Please enter password' }],
          },
        });
        done();
      });
  });

  it('should be able to login', (done) => {
    chai
      .request(server)
      .post(loginUrl)
      .send({
        email: 'augustineezinwa@gmail.com',
        password: 'fishdonkey99',
      })
      .end((request, response) => {
        response.status.should.eql(200);
        response.body.token.should.be.a('string');
        done();
      });
  });
});

/**
 * FOR CREATING A MEMORY ~ TESTs
 */
describe('CREATE MEMORY', () => {
  it('can create memory when user is signed in', (done) => {
    const memory = {
      title: 'This is the title of my story',
      story: 'This is the story, I went to new york',
      picture: 'https://xyz.com',
      mood: 'happy',
    };
    chai
      .request(server)
      .post(createMemoryUrl)
      .set('authorization', userWallet.token)
      .send(memory)
      .end(async (request, response) => {
        response.status.should.eql(201);
        delete response.body.memory.createdAt;
        delete response.body.memory.updatedAt;
        response.body.memory.should.eql({
          ...memory,
          userId: userWallet.id,
          id: 1,
        });

        /**
         * Check if memory is really created in DB by user
         */
        const memoryFound = await Memory.findOne({
          where: { userId: userWallet.id },
        });
        memoryFound.story.should.eql(memory.story);
        done();
      });
  });

  it('test another user when signed in can create memory', (done) => {
    const memory = {
      title: 'my story title',
      story: 'This is the story, I went to SF',
      picture: 'https://xyz.com',
      mood: 'excited',
    };
    chai
      .request(server)
      .post(createMemoryUrl)
      .set('authorization', anotherUserWallet.token)
      .send(memory)
      .end(async (request, response) => {
        response.status.should.eql(201);
        delete response.body.memory.createdAt;
        delete response.body.memory.updatedAt;
        response.body.memory.should.eql({
          ...memory,
          userId: anotherUserWallet.id,
          id: 2,
        });

        /**
         * Check if memory is really created in DB by user
         */
        const memoryFound = await Memory.findOne({
          where: { userId: anotherUserWallet.id },
        });
        memoryFound.story.should.eql(memory.story);
        done();
      });
  });

  it('should not create a memory if user enters invalid inputs for memory', (done) => {
    chai
      .request(server)
      .post(createMemoryUrl)
      .set('authorization', userWallet.token)
      .end((request, response) => {
        response.status.should.eql(422);
        response.body.should.eql({
          errors: {
            mood: [
              {
                message: 'Please enter a valid mood',
              },
              {
                message:
                  'Please select a predefined mood, [happy, sad, excited]',
              },
            ],
            story: [
              {
                message: 'Please tell a story',
              },
            ],
            title: [
              {
                message: 'Please enter a title',
              },
            ],
          },
        });
        done();
      });
  });
});

/**
 * FOR FETCHING A MEMORY ~ TESTS
 */
describe('FETCH A MEMORY', () => {
  it("can view a user's memory when user is signed in", (done) => {
    chai
      .request(server)
      .get('/api/v1/memories/1')
      .set('authorization', userWallet.token)
      .end(async (request, response) => {
        response.status.should.eql(200);

        const memory = await Memory.findByPk(1);
        response.body.id.should.eql(memory.id);
        done();
      });
  });
});

/**
 * FOR FETCHING ALL MEMORIES ~ TESTS
 */
describe("FETCH ALL USER'S MEMORIES", () => {
  it("can view all user's memories when user is signed in", (done) => {
    chai
      .request(server)
      .get('/api/v1/memories')
      .set('authorization', userWallet.token)
      .end(async (request, response) => {
        response.status.should.eql(200);

        const memories = await Memory.findAll({ where: { userId: 1 } });
        expect(memories.length).to.eql(1);
        response.body[0].id.should.eql(memories[0].id);
        done();
      });
  });
});

/**
 * FOR UPDATING A MEMORY ~ TESTS
 */
describe('UPDATE A MEMORY', () => {
  it('user can update their memory when signed in', (done) => {
    const memory = {
      story: 'This is the updated story, I went to new jersey',
      title: 'This is the title of my story',
      picture: 'https://xyz.com',
      mood: 'happy',
    };
    chai
      .request(server)
      .put('/api/v1/memories/1')
      .set('authorization', userWallet.token)
      .send(memory)
      .end(async (request, response) => {
        response.status.should.eql(200);
        response.body.message.should.eql('memory updated');

        /**
         * Check if memory is really created in DB by user
         */
        const memoryFound = await Memory.findByPk(1);
        memoryFound.story.should.eql(memory.story);
        done();
      });
  });
});

/**
 * FOR DELETING A MEMORY ~ TESTs
 */
describe('DELETE A MEMORY', () => {
  it('user can delete their memory', (done) => {
    chai
      .request(server)
      .delete('/api/v1/memories/1')
      .set('authorization', userWallet.token)
      .end(async (request, response) => {
        response.status.should.eql(200);
        response.body.should.eql({ message: 'memory deleted' });

        /**
         * Checking DB to be sure memory is deleted
         */
        const memory = await Memory.findByPk(1);
        expect(memory).to.be.eql(null);
        done();
      });
  });
});

/**
 * Security, Tests for permissions here
 */

describe('Permissions', () => {
  it("cannot delete another user's memory", (done) => {
    chai
      .request(server)
      .delete('/api/v1/memories/2')
      .set('authorization', userWallet.token)
      .end((request, response) => {
        response.status.should.eql(403);
        response.body.should.eql({
          message: "You don't have access to this resource",
        });
        done();
      });
  });
  it("cannot update another user's memory", (done) => {
    chai
      .request(server)
      .put('/api/v1/memories/2')
      .set('authorization', userWallet.token)
      .end((request, response) => {
        response.status.should.eql(403);
        response.body.should.eql({
          message: "You don't have access to this resource",
        });
        done();
      });
  });
  it("cannot view another user's memory", (done) => {
    chai
      .request(server)
      .get('/api/v1/memories/2')
      .set('authorization', userWallet.token)
      .end((request, response) => {
        response.status.should.eql(403);
        response.body.should.eql({
          message: "You don't have access to this resource",
        });
        done();
      });
  });
});

/**
 * Authorization, anyone not signed in cannot
 * view protected resources
 */
describe('Authorization', () => {
  it('cannot create memory if user is not signed in', (done) => {
    chai
      .request(server)
      .post(createMemoryUrl)
      .end((request, response) => {
        response.status.should.eql(401);
        response.body.should.eql({
          message: 'Not authorized!, No credentials',
        });
        done();
      });
  });
  it('cannot delete memory if user is not signed in', (done) => {
    chai
      .request(server)
      .delete('/api/v1/memories/1')
      .end((request, response) => {
        response.status.should.eql(401);
        response.body.should.eql({
          message: 'Not authorized!, No credentials',
        });
        done();
      });
  });

  it('cannot view a memory if user is not signed in', (done) => {
    chai
      .request(server)
      .get('/api/v1/memories/1')
      .end((request, response) => {
        response.status.should.eql(401);
        response.body.should.eql({
          message: 'Not authorized!, No credentials',
        });
        done();
      });
  });

  it('cannot update a memory if user is not signed in', (done) => {
    chai
      .request(server)
      .put('/api/v1/memories/1')
      .end((request, response) => {
        response.status.should.eql(401);
        response.body.should.eql({
          message: 'Not authorized!, No credentials',
        });
        done();
      });
  });
});
