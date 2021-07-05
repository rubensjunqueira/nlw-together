import { getConnection } from "typeorm";
import connect from "../../database";
import supertest from 'supertest';
import { app } from "../../app";
import { Tag } from "../../entities/Tag";

describe('CreateTagController', () => {
    beforeAll(async () => {
        await connect();
    });

    beforeEach(async () => {
        const connection = getConnection();

        await connection.dropDatabase();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    });

    it('should not be able to create a new tag if user is not authenticated with token', async () => {
        const response = await supertest(app)
            .post('/tags')
            .send({
                name: 'Ajuda'
            });

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'Token is missing!'
        });
    });

    it('should not be able to create a new tag if user is not authenticated with valid token format', async () => {
        const response = await supertest(app)
            .post('/tags')
            .set({ Authorization: `Bearer ` })
            .send({
                name: 'Ajuda'
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Token invalid format!'
        });
    });

    it('should not be able to create a new tag if the user sends a malformed token', async () => {
        const response = await supertest(app)
            .post('/tags')
            .set({ Authorization: `Bearer 2ed40426-f1f1-5c8b-9e6c-d80bd7a11f6e` })
            .send({
                name: 'Ajuda'
            });

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'jwt malformed'
        });
    });

    it('should not be able to create a new tag if the token signature is invalid', async () => {
        const response = await supertest(app)
            .post('/tags')
            .set({ Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` })
            .send({
                name: 'Ajuda'
            });

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'invalid signature'
        });
    });

    it('should not be able to create a new tag if name is undefined', async () => {
        const { body: user } = await supertest(app)
            .post('/users')
            .send({
                name: 'Bessie Welch',
                email: 'dojgeluha@kuli.kp',
                password: '123456',
                admin: true
            });

        const { body: userAuthenticated } = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: user.email,
                password: '123456'
            });

        const response = await supertest(app)
            .post('/tags')
            .set({ Authorization: `Bearer ${userAuthenticated.token}` });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Name must not be empty!'
        });
    });

    it('should not be able to create a new tag if name is empty', async () => {
        const { body: user } = await supertest(app)
            .post('/users')
            .send({
                name: 'Bessie Welch',
                email: 'dojgeluha@kuli.kp',
                password: '123456',
                admin: true
            });

        const { body: userAuthenticated } = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: user.email,
                password: '123456'
            });

        const response = await supertest(app)
            .post('/tags')
            .set({ Authorization: `Bearer ${userAuthenticated.token}` })
            .send({
                name: ''
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Name must not be empty!'
        });
    });

    it('should not be able to create a new tag if tag_name already exists', async () => {
        const { body: user } = await supertest(app)
            .post('/users')
            .send({
                name: 'Bessie Welch',
                email: 'dojgeluha@kuli.kp',
                password: '123456',
                admin: true
            });

        const { body: userAuthenticated } = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: user.email,
                password: '123456'
            });

        await supertest(app)
            .post('/tags')
            .set({ Authorization: `Bearer ${userAuthenticated.token}` })
            .send({
                name: 'Ajuda'
            });

        const response = await supertest(app)
            .post('/tags')
            .set({ Authorization: `Bearer ${userAuthenticated.token}` })
            .send({
                name: 'Ajuda'
            });

        expect(response.status).toBe(400)
        expect(response.body).toMatchObject({
            error: 'Tag Ajuda already exists!'
        });
    });

    it('should not be able to create a new tag if user is not admin', async () => {
        const { body: user } = await supertest(app)
            .post('/users')
            .send({
                name: 'Bessie Welch',
                email: 'dojgeluha@kuli.kp',
                password: '123456',
                admin: false
            });

        const { body: userAuthenticated } = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: user.email,
                password: '123456'
            });

        const response = await supertest(app)
            .post('/tags')
            .set({ Authorization: `Bearer ${userAuthenticated.token}` })
            .send({
                name: 'Ajuda'
            });

        expect(response.status).toBe(401)
        expect(response.body).toMatchObject({
            error: 'Unauthorized'
        });
    });

    it('should be able to create a new tag', async () => {
        const { body: user } = await supertest(app)
            .post('/users')
            .send({
                name: 'Bessie Welch',
                email: 'dojgeluha@kuli.kp',
                password: '123456',
                admin: true
            });

        const { body: userAuthenticated } = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: user.email,
                password: '123456'
            });

        const response = await supertest(app)
            .post('/tags')
            .set({ Authorization: `Bearer ${userAuthenticated.token}` })
            .send({
                name: 'Ajuda'
            });

        expect(response.status).toBe(201)
        expect(response.body).toMatchObject({
            id: expect.any(String),
            name: 'Ajuda',
            created_at: expect.any(String),
            updated_at: expect.any(String)
        });
    });
});