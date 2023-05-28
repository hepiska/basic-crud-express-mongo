import { createUser, login } from '../user.service';

jest.mock('./user.service', () => ({
  createUser: jest.fn(),
  login: jest.fn()
}));

describe('AuthController', () => {
  // ...
});