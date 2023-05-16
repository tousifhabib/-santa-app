import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import * as userService from '../../src/services/user.service';

describe('userService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should get user data', async () => {
        const userData = { username: 'test', uid: 'testUid' };
        const stub = sinon.stub(axios, 'get').resolves({ data: [userData] });

        const result = await userService.getUserData('test');
        expect(result).to.deep.equal(userData);
        sinon.assert.calledWith(stub, `${process.env.API_URL}/users.json`);
    });

    // Similar test for getProfileData...
});