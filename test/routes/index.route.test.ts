import request from 'supertest';
import express from 'express';
import indexRouter from '../../src/routes/index.route';
import * as path from "path";
import * as fs from "fs";

const app = express();
app.use(express.json());
app.use('/', indexRouter);

const expectedHtml = fs.readFileSync(path.resolve(__dirname, '../../views/index.html'), 'utf-8');
describe('GET /', () => {
    it('should respond with some message', async () => {
        const res = await request(app)
            .get('/')
            .expect(200);


        expect(res.text).toEqual(expectedHtml);
    });
});
