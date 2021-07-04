import { getMockReq, getMockRes } from '@jest-mock/express';
import { getConnection } from 'typeorm';
import connect from '../database';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { UserDoesNotExistsError } from '../errors/UserDoesNotExistsError';
import { ensureAdmin } from './ensureAdmin';
import supertest from 'supertest';
import { app } from '../app';

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
    })

    it('should throw UserDoesNotExists', async () => {
        await expect(ensureAdmin(req, res, next))
            .rejects.toBeInstanceOf(UserDoesNotExistsError);
    });

    it('should throw UnauthorizedError', async () => {
        const { body: user } = await supertest(app)
            .post('/users')
            .send({
                name: 'Inez Lee',
                password: '123456',
                email: 'lizibvef@tovgo.vg',
                admin: false
            });

        req.user_id = user.id;


        await expect(ensureAdmin(req, res, next))
            .rejects.toBeInstanceOf(UnauthorizedError);
    });

    it('shoud call next if user is an admin', async () => {
        const { body: user } = await supertest(app)
            .post('/users')
            .send({
                name: 'Inez Lee',
                password: '123456',
                email: 'lizibvef@tovgo.vg',
                admin: true
            });

        req.user_id = user.id;

        await ensureAdmin(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});