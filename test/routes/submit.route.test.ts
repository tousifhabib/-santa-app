import fs from 'fs';
import path from 'path';

import request from 'supertest';
import express from 'express';
import sinon from 'sinon';

import * as userService from '../../src/services/user.service';
import submitRouter from '../../src/routes/submit.route';

const app = express();
app.use(express.json());
app.use('/', submitRouter);

const expectedHtml = fs.readFileSync(path.resolve(__dirname, '../../views/request-received.html'), 'utf-8');
describe('POST /', () => {
  let getUserDataStub: sinon.SinonStub;
  let getProfileDataStub: sinon.SinonStub;

  beforeAll(() => {
    getUserDataStub = sinon.stub(userService, 'getUserData');
    getProfileDataStub = sinon.stub(userService, 'getProfileData');
  });

  afterEach(() => {
    getUserDataStub.reset();
    getProfileDataStub.reset();
  });

  afterAll(() => {
    getUserDataStub.restore();
    getProfileDataStub.restore();
  });

  it('should respond with some message', async () => {
    getUserDataStub.resolves({
      uid: 'test-uid',
      username: 'charlie.brown',
    });

    getProfileDataStub.resolves({
      uid: 'test-uid',
      address: '123 Test St',
      birthdate: '01/01/2019',
    });

    const res = await request(app)
      .post('/')
      .send({
        userid: 'charlie.brown',
        wish: 'I want a bike',
      })
      .expect(200);
    expect(res.text).toEqual(expectedHtml);
  });
});
