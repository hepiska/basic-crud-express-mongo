import request from 'supertest';
import genetareApp from '../../../__mock__/express.mock';
import { createUser } from '../../user.service';
import userRouter from '../../user.controller';


jest.mock('../user.service', () => ({
  createUser: jest.fn()
}));


const app = genetareApp(userRouter);


describe('user', () => {
  it('should succes create user', async () => {
    // given
    const body = {
      name: "success",
      email: "sucess@mail.com",
      password: "123456"
    };
    (createUser as jest.Mock).mockResolvedValue(body)

    // when
    const res = await request(app).post('')
      .set('Accept', 'application/json').send(body)

    // then
    expect(res.status).toBe(200);
    expect(res.body).toEqual(body);
  });

  it('should failed validation user', async () => {
    // given
    const body = {
      name: "success",
      password: "123456"
    };
    (createUser as jest.Mock).mockResolvedValue(body)

    // when
    const res = await request(app).post('')
      .set('Accept', 'application/json').send(body)

    // then
    expect(res.status).toBe(200);
    expect(res.body).toEqual(body);
  });

})