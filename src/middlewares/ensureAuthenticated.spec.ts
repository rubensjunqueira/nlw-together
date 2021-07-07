import { getMockReq, getMockRes } from '@jest-mock/express';
import supertest from 'supertest';
import { getConnection } from 'typeorm';

import { app } from '../app';
import connect from '../database';
import { AppError } from '../errors/AppError';
import { TokenInvalidFormat } from '../errors/TokenInvalidFormat';
import { TokenIsMissingError } from '../errors/TokenIsMissingError';
import { ensureAuthenticated } from './ensureAuthenticated';

describe('ensureAdmin', () => {
    const req = getMockReq();
    const { res, next, clearMockRes } = getMockRes();

    beforeAll(async () => {
        await connect();
    });

    beforeEach(async () => {
        clearMockRes();
        const connection = getConnection();

        await connection.dropDatabase();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    });

    it('should throw TokenIsMissingError', async () => {
        await expect(
            ensureAuthenticated(req, res, next)
        ).rejects.toBeInstanceOf(TokenIsMissingError);
    });

    it('should throw TokenInvalidFormat', async () => {
        const token = 'Bearer ';

        req.headers.authorization = token;

        await expect(
            ensureAuthenticated(req, res, next)
        ).rejects.toBeInstanceOf(TokenInvalidFormat);
    });

    it('should throw AppError', async () => {
        const token = 'Bearer e168c364-b0d0-5877-849c-130ac08a899c';

        req.headers.authorization = token;

        await expect(
            ensureAuthenticated(req, res, next)
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should call next', async () => {
        const { body: user } = await supertest(app).post('/users').send({
            name: 'Frank Hawkins',
            email: 'ta@ju.mn',
            password: '123456',
        });

        const { body: authenticadeUser } = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: user.email,
                password: '123456',
            });

        const token = `Bearer ${authenticadeUser.token}`;
        req.headers.authorization = token;

        await ensureAuthenticated(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.user_id).toEqual(user.id);
    });
});
