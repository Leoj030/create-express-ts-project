import express, { Application } from 'express';
import request from 'supertest';
import getHello from '../src/controllers/getter.controller';

const app = express();
app.get('/', getHello);

describe('GET /', () => {
    it('should return "Hello World"', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Hello World');
    });
});
