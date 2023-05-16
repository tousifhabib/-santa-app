import { expect } from 'chai';
import sinon from 'sinon';
import * as indexController from '../../src/controllers/index.controller';

describe('indexController', () => {
    it('should send index.html', () => {
        const req = {};
        const res = { sendFile: sinon.stub() };

        indexController.getIndex(req as any, res as any);

        sinon.assert.calledWith(res.sendFile, sinon.match.string);
        expect(res.sendFile.firstCall.args[0]).to.include('views/index.html');
    });
});