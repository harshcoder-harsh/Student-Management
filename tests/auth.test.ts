import request from 'supertest';
import app from '../src/app';
describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@student.com',
        password: 'password123',
        role: 'Student',
        name: 'Test Student',
        age: 20
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('email', 'test@student.com');
  });
  it('should login an existing user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testlogin@student.com',
        password: 'password123',
        role: 'Admin',
        name: 'Admin Test'
      });
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testlogin@student.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('token');
  });
});
