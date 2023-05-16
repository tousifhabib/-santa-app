import { expect } from 'chai';
import sinon from 'sinon';
import nodemailer from 'nodemailer';

import * as mailService from '../../src/services/mail.service';

describe('mailService', () => {
  afterEach(() => {
    sinon.restore(); // Restore all stubs after each test
  });

  it('should send an email', async () => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const expectedResult: nodemailer.SentMessageInfo = {
      messageId: '1',
      envelope: { from: 'test', to: ['test'] },
      accepted: ['test'],
      rejected: [],
      pending: [],
      response: 'test',
    };

    const sendMailStub = sinon.stub(transporter, 'sendMail').resolves(expectedResult);
    sinon.stub(nodemailer, 'createTransport').returns(transporter);

    const requestList = [
      {
        username: 'test',
        address: 'testAddress',
        wish: 'testWish',
      },
    ];

    const result = await mailService.sendMail(requestList);
    expect(result).to.deep.equal(expectedResult);
    sinon.assert.calledOnce(sendMailStub);
  });
});
