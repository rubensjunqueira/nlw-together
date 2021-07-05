import connect from "../../database";
import { Any, getConnection } from "typeorm";
import supertest from "supertest";
import { app } from "../../app";
import { User } from "../../entities/User";

describe('ListUsersController', () => {
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

    it('should not be able to list all users if user is not authenticated with token', async () => {
        const response = await supertest(app)
            .get('/users')

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'Token is missing!'
        });
    });

    it('should not be able to list all users if user is not authenticated with valid token format', async () => {
        const response = await supertest(app)
            .get('/users')
            .set({ Authorization: `Bearer ` })

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Token invalid format!'
        });
    });

    it('should not be able to list all users if user sends a malformed token', async () => {
        const response = await supertest(app)
            .get('/users')
            .set({ Authorization: `Bearer 2ed40426-f1f1-5c8b-9e6c-d80bd7a11f6e` });

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'jwt malformed'
        });
    });

    it('should not be able to list all users if token signature is invalid', async () => {
        const response = await supertest(app)
            .get('/users')
            .set({ Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` });

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'invalid signature'
        });
    });

    it('should be return status 200 if list contains itens', async () => {
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
            .post('/users')
            .set({ Authorization: `Bearer ${userAuthenticated.token}` })

        const response = await supertest(app)
            .get('/users')
            .set({ Authorization: `Bearer ${userAuthenticated.token}` });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toMatchObject([
            {
                name: 'Bessie Welch',
                email: 'dojgeluha@kuli.kp',
                admin: true,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            }
        ]);
    });
});