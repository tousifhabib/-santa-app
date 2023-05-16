import { expect } from 'chai';
import sinon from 'sinon';
import * as userService from '../../src/services/user.service';
import * as indexController from '../../src/controllers/submit.controller';

describe('submitController', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        req = { body: { userid: 'test', wish: 'testWish' } };
        res = { sendFile: sinon.stub(), status: sinon.stub().returnsThis() };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should handle user not found', async () => {
        sinon.stub(userService, 'getUserData').resolves(undefined);

        await indexController.submitRequest(req, res);

        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledWith(res.sendFile, sinon.match.string);
        expect(res.sendFile.firstCall.args[0]).to.include('views/error/user-not-registered.html');
    });

    // Similar tests for other cases...
});