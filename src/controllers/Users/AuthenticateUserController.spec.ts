import supertest from "supertest";
import { getConnection } from "typeorm";
import { app } from "../../app";
import connect from "../../database";
import { User } from "../../entities/User";

describe('AuthenticateUserController', () => {
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

    it('should not be able to authenticate if user does not exists', async () => {
        const response = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: 'allol@rel.be',
                password: '123456'
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Email or password invalid!'
        });
    });

    it('should not be able to authenticate if password does not match', async () => {
        await supertest(app)
            .post('/users')
            .send({
                name: 'Isaiah Hawkins',
                email: 'safcog@inooza.co.uk',
                password: '123456'
            });

        const response = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: 'safcog@inooza.co.uk',
                password: '1223456'
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Email or password invalid!'
        });
    });

    it('should be able to authenticate user', async () => {
        await supertest(app)
            .post('/users')
            .send({
                name: 'Barbara Tran',
                email: 'kis@loldubzoz.sl',
                password: '123456',
            });

        const response = await supertest(app)
            .post('/users/authenticate')
            .send({
                email: 'kis@loldubzoz.sl',
                password: '123456',
            });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            user: expect.objectContaining({
                id: expect.any(String),
                name: 'Barbara Tran',
                email: 'kis@loldubzoz.sl',
                admin: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }),
            token: expect.any(String)
        })
    });
});