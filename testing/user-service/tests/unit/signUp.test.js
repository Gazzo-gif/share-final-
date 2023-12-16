const httpStatus = require('http-status-codes').StatusCodes;
const bcrypt = require('bcrypt');
const registerUser = require('../../controllers/signUp.service');
const { db, FieldValue } = require('../../startup/firebase');
require('dotenv').config();

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('../../startup/firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      where: jest.fn(() => ({
        get: jest.fn(() => ({
          empty: true,
          docs: [],
        })),
      })),
      add: jest.fn(() => ({
        id: 'mockUserId',
      })),
    })),
  },
  FieldValue: {
    serverTimestamp: jest.fn(),
  },
}));

describe('registerUser', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        dob: '1990-01-01',
        latitude: 51.3397,
        longitude: 12.3731,
        password: 'password123',
      },
    };

    res = {
      status: jest.fn(() => res),
      header: jest.fn(() => res),
      json: jest.fn(() => res),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('registers a user successfully', async () => {
    bcrypt.genSalt.mockResolvedValue('mockSalt');
    bcrypt.hash.mockResolvedValue('mockHash');

    FieldValue.serverTimestamp.mockReturnValue('mockTimestamp');

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
    expect(res.header).toHaveBeenCalledWith('x-auth-token', expect.any(String));
    expect(res.json).toHaveBeenCalledWith({
      message: 'User registered successfully',
      user: {
        id: 'mockUserId',
        name: 'John Doe',
        email: 'john@example.com',
        dob: '1990-01-01',
        location: 'Leipzig, Germany',
      },
    });
  });
});
