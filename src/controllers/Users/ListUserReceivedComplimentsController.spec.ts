import supertest from "supertest";
import { getConnection } from "typeorm";
import { app } from "../../app";
import connect from '../../database';
import { Compliment } from "../../entities/Compliment";

describe('ListUserReceivedCompliments', () => {
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

    it('should not be able to list all user compliments if user is not authenticated with token', async () => {
        const response = await supertest(app)
            .get('/users/compliments/received')

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'Token is missing!'
        });
    });

    it('should not be able to list all user compliments if user is not authenticated with valid token format', async () => {
        const response = await supertest(app)
            .get('/users/compliments/received')
            .set({ Authorization: `Bearer ` })

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Token invalid format!'
        });
    });

    it('should not be able to list all user compliments if user sends a malformed token', async () => {
        const response = await supertest(app)
            .get('/users/compliments/received')
            .set({ Authorization: `Bearer 2ed40426-f1f1-5c8b-9e6c-d80bd7a11f6e` });

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'jwt malformed'
        });
    });

    it('should not be able to list all user compliments if token signature is invalid', async () => {
        const response = await supertest(app)
            .get('/users/compliments/received')
            .set({ Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` });

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'invalid signature'
        });
    });

    it('should return status 204 if it is an empty list', async () => {
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
            .get('/users/compliments/received')
            .set({ Authorization: `Bearer ${userAuthenticated.token}` });

        expect(response.status).toBe(204);
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

        const { body: user2 } = await supertest(app)
            .post('/users')
            .send({
                name: 'May Todd',
                email: 'cehev@si.ge',
                password: '123456',
            });

        const { body: userAuthenticated1 } = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: user.email,
                password: '123456'
            });

        const { body: userAuthenticated2 } = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: user2.email,
                password: '123456'
            });

        const { body: tag } = await supertest(app)
            .post('/tags')
            .set({ Authorization: `Bearer ${userAuthenticated1.token}` })
            .send({
                name: 'Ajuda'
            })

        await supertest(app)
            .post('/compliments')
            .set({ Authorization: `Bearer ${userAuthenticated1.token}` })
            .send({
                user_receiver: user2.id,
                tag_id: tag.id,
                message: 'Me ajudou muito!'
            });

        const response = await supertest(app)
            .get('/users/compliments/received')
            .set({ Authorization: `Bearer ${userAuthenticated2.token}` })


        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toMatchObject([
            {
                id: expect.any(String),
                message: 'Me ajudou muito!',
                user_receiver: user2.id,
                user_sender: user.id,
                created_at: expect.any(String),
                tag_id: tag.id,

            }
        ]);
    });
});