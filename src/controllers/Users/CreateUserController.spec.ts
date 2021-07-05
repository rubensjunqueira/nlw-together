import supertest from "supertest";
import { getConnection } from "typeorm";
import { app } from "../../app";
import connect from "../../database";
import { User } from "../../entities/User";

describe('CreateUserController', () => {
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

    it('should not be able to create a new user if email is undefined', async () => {
        const response = await supertest(app)
            .post('/users')
            .send({
                name: 'Elsie Cole',
                password: '123456',
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Email Incorrect!'
        });
    });

    it('should not be able to create a new user if user already exists', async () => {
        await supertest(app)
            .post('/users')
            .send({
                name: 'Ernest Huff',
                email: 'tivci@mag.mh',
                password: '123456'
            });

        const response = await supertest(app)
            .post('/users')
            .send({
                name: 'Elsie Cole',
                email: 'tivci@mag.mh',
                password: '123456',
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: `User tivci@mag.mh already exists!`
        });
    });

    it('should be able to create a new user', async () => {
        const response = await supertest(app)
            .post('/users')
            .send({
                name: 'Elsie Cole',
                email: 'tivci@mag.mh',
                password: '123456',
            });

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            id: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            admin: false,
            name: 'Elsie Cole',
            email: 'tivci@mag.mh',
        });
    });
});