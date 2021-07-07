import supertest from 'supertest';
import { getConnection } from 'typeorm';

import { app } from '../../app';
import connect from '../../database';
import { Compliment } from '../../entities/Compliment';

describe('CreateComplimentController', () => {
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

    it('should not be able to create a new compliment if user is not authenticated', async () => {
        const response = await supertest(app).post('/compliments').send({
            tag_id: '1589254f-808f-56b8-a849-693459654bca',
            user_receiver: 'bfd3cd0e-4e7b-565d-9c11-bdcaf0af74c2',
            message: 'Alguma mensagem',
        });

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'Token is missing!',
        });
    });

    it('should not be able to create a new compliment if the token format is invalid', async () => {
        const response = await supertest(app)
            .post('/compliments')
            .set({ Authorization: 'Bearer ' })
            .send({
                tag_id: '1589254f-808f-56b8-a849-693459654bca',
                user_receiver: 'bfd3cd0e-4e7b-565d-9c11-bdcaf0af74c2',
                message: 'Alguma mensagem',
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Token invalid format!',
        });
    });

    it('should not be able to create a new compliment if token has invalid signature', async () => {
        const response = await supertest(app)
            .post('/compliments')
            .set({
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            })
            .send({
                tag_id: '1589254f-808f-56b8-a849-693459654bca',
                user_receiver: 'bfd3cd0e-4e7b-565d-9c11-bdcaf0af74c2',
                message: 'Alguma mensagem',
            });

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'invalid signature',
        });
    });

    it('should not be able to create a new compliment if token is malformed', async () => {
        const response = await supertest(app)
            .post('/compliments')
            .set({
                Authorization: 'Bearer 704056e3-cdab-59eb-a120-24532588ac54',
            })
            .send({
                tag_id: '1589254f-808f-56b8-a849-693459654bca',
                user_receiver: 'bfd3cd0e-4e7b-565d-9c11-bdcaf0af74c2',
                message: 'Alguma mensagem',
            });

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'jwt malformed',
        });
    });

    it('should not be able to create a new compliment if receiver and sender are equal', async () => {
        const { body: user } = await supertest(app).post('/users').send({
            name: 'Rosie Cain',
            email: 'et@fobpis.ad',
            admin: true,
            password: '123456',
        });

        const { body: authenticatedUser } = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: user.email,
                password: '123456',
            });

        const response = await supertest(app)
            .post('/compliments')
            .set({ Authorization: `Bearer ${authenticatedUser.token}` })
            .send({
                tag_id: '1589254f-808f-56b8-a849-693459654bca',
                user_receiver: user.id,
                message: 'Alguma mensagem',
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Receiver and Sender must be different!',
        });
    });

    it('should not be able to create a new compliment if tag_id does not exists', async () => {
        const { body: user1 } = await supertest(app).post('/users').send({
            name: 'Rosie Cain',
            email: 'et@fobpis.ad',
            admin: true,
            password: '123456',
        });

        const { body: user2 } = await supertest(app).post('/users').send({
            name: 'Mabel Gibson',
            email: 'zigusud@nomib.sb',
            admin: true,
            password: '123456',
        });

        const { body: authenticatedUser1 } = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: user1.email,
                password: '123456',
            });

        const response = await supertest(app)
            .post('/compliments')
            .set({ Authorization: `Bearer ${authenticatedUser1.token}` })
            .send({
                tag_id: '1589254f-808f-56b8-a849-693459654bca',
                user_receiver: user2.id,
                message: 'Alguma mensagem',
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Tag does not exists!',
        });
    });

    it('should not be able to create a new compliment if user_receiver does not exists', async () => {
        const { body: user } = await supertest(app).post('/users').send({
            name: 'Rosie Cain',
            email: 'et@fobpis.ad',
            admin: true,
            password: '123456',
        });

        const { body: authenticatedUser } = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: user.email,
                password: '123456',
            });

        const { body: createdTag } = await supertest(app)
            .post('/tags')
            .set({ Authorization: `Bearer ${authenticatedUser.token}` })
            .send({
                name: 'Ajuda',
            });

        const response = await supertest(app)
            .post('/compliments')
            .set({ Authorization: `Bearer ${authenticatedUser.token}` })
            .send({
                tag_id: createdTag.id,
                user_receiver: 'c95de9f2-2c4a-5653-9fc2-d189d25700b1',
                message: 'Alguma mensagem',
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'User receiver does not exists!',
        });
    });

    it('should be able to create a new compliment', async () => {
        const { body: user1 } = await supertest(app).post('/users').send({
            name: 'Rosie Cain',
            email: 'et@fobpis.ad',
            admin: true,
            password: '123456',
        });

        const { body: user2 } = await supertest(app).post('/users').send({
            name: 'Mabel Gibson',
            email: 'zigusud@nomib.sb',
            admin: true,
            password: '123456',
        });

        const { body: authenticatedUser } = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: user1.email,
                password: '123456',
            });

        const { body: createdTag } = await supertest(app)
            .post('/tags')
            .set({ Authorization: `Bearer ${authenticatedUser.token}` })
            .send({
                name: 'Ajuda',
            });

        const response = await supertest(app)
            .post('/compliments')
            .set({ Authorization: `Bearer ${authenticatedUser.token}` })
            .send({
                tag_id: createdTag.id,
                user_receiver: user2.id,
                message: 'Alguma mensagem',
            });

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject<Partial<Compliment>>({
            id: expect.any(String),
            user_sender: user1.id,
            user_receiver: user2.id,
            message: 'Alguma mensagem',
            created_at: expect.any(String),
        });
    });
});
