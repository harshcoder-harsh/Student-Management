import request from 'supertest';
import app from '../src/app';
import jwt from 'jsonwebtoken';
describe('Student Endpoints', () => {
  let token: string;
  beforeAll(() => {
    token = jwt.sign({ id: 'dummyid', role: 'Admin' }, process.env.JWT_SECRET || 'supersecretjwtkey');
  });
  it('should get all students with valid token', async () => {
    const res = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${token}`);
  });
});
