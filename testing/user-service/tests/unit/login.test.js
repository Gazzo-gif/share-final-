const bcrypt = require('bcrypt');
const httpStatus = require('http-status-codes').StatusCodes;
const login = require('../../controllers/login.service');
require('dotenv').config();

jest.mock('bcrypt');
jest.mock('../../startup/firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      where: jest.fn(() => ({
        limit: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({
            empty: false,
            docs: [{
              id: 'user-doc-id',
              data: () => ({
                email: 'test@example.com',
                password: '$2b$10$hashedPassword',
                temporary_password: null,
              }),
            }],
          }),
        })),
      })),
    })),
  },
}));

describe('Login function', () => {
  it('should login successfully with valid credentials', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: '',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const compareMock = jest.fn().mockResolvedValue(true);
    bcrypt.compare.mockImplementation(compareMock);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.header).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: 'Login Successful!' });
  });
});
