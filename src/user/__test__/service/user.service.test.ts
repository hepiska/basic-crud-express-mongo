import { createUser } from "../../user.service"
import userRepositoryBase from '../../user.repositories';

jest.mock('../../user.repositories', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn()
  }
}));

describe('UserService', () => {
  it('should save on create user', async () => {
    // given
    const body = {
      email: "valid.mail.com",
      password: "123456",
      name: "valid name"
    };

    (userRepositoryBase.create as jest.Mock).mockResolvedValue(body);
    (userRepositoryBase.save as jest.Mock).mockResolvedValue(body);

    const res = await createUser(body)

    expect(res).toEqual(body);

  })

  it('should trow error when duplicate email on create user', async () => {
    // given
    const body = {
      email: "valid.mail.com",
      password: "123456",
      name: "valid name"
    };

    (userRepositoryBase.create as jest.Mock).mockResolvedValue(body);
    (userRepositoryBase.save as jest.Mock).mockImplementation(() => {
      throw new Error("duplicate key error");
    })

    try {
      // when
      const res = await createUser(body)

    } catch (error) {
      // then
      expect(error).toEqual(new Error("duplicate key error"));

    }
  })

})