import request from 'supertest';
import genetareApp from '../../../__mock__/express.mock';
import { createUser, login } from '../../user.service';
import userRouter from '../../auth.controller';


jest.mock('../user.service', () => ({
  createUser: jest.fn(),
  login: jest.fn()
}));


const app = genetareApp(userRouter);


describe('AuthController', () => {
  it('should succes login', async () => {
    // given
    const body = {
      email: "success@mail.com",
      password: "123456"
    };

    (login as jest.Mock).mockResolvedValue("token")

    const res = await request(app).post('/login')
      .set('Accept', 'application/json').send(body)

    expect(res.status).toBe(200);

  });
  it('should  failed login validation', async () => {
    // given
    const body = {
      email: "sasa",
      password: "123456"
    };

    (login as jest.Mock).mockResolvedValue("token")
    const res = await request(app).post('/login')
      .set('Accept', 'application/json').send(body)
    expect(res.status).toBe(400);

  });


});