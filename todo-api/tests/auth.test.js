import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod;

beforeAll(async() => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
});

afterAll(async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
});

describe('Todo API Tests', () => {
    let token;
    let todoId;

    const testUser = {
        name: "Architect",
        email: "architect@gmail.com",
        password: "password123"
    }

    it('1. POST /sign-up - Should create a new user', async() => {
        const response = await request(app).post('/sign-up').send(testUser);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('2. POST /login - Should be logged in', async() => {
        const response = await request(app).post('/login').send({
            email: testUser.email,
            password: testUser.password
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');

        token = response.body.token;
    });


    it('3. POST /todos - create a todo', async() => {
        testTodo = {
            title: "Master testing",
            description: "Write my first Integration test"
        };

        const response = await request(app)
            .post('/todos')
            .set('Authorization', `Bearer ${token}`)
            .send(testTodo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(testTodo.title);

        todoId = response.body._id;
            
    })

    it('4. GET /todos - Should fetch all Todos for this user', async () => {
        const response = await request(app)
            .get('/todos')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        // Expect the body to be an array, and its length should be 1
        expect(Array.isArray(response.body.todos)).toBeTruthy();
        expect(response.body.todos.length).toBe(1);
    });

    it('5. PUT /todos/:id - Should update the specific Todo', async () => {
        const response = await request(app)
            .put(`/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: "Mastered Automated Testing!" });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Mastered Automated Testing!");
    });

    it('6. DELETE /todos/:id - Should delete the Todo', async () => {
        const response = await request(app)
            .delete(`/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200); 
    });


})