import request from 'supertest';
import { expect } from 'chai';

import app from '../src/app';

describe('app', () => {
  it('should be a function', () => {
    expect(app).to.be.a('function');
  });

  it('should respond with 500 on unhandled routes', async () => {
    await request(app)
      .get('/nonexistent-route')
      .expect(500);
  });
});