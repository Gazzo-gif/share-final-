const bcrypt = require('bcrypt');
const generator = require('generate-password');
const httpStatus = require('http-status-codes').StatusCodes;
const resetPassword = require('../../controllers/resetPassword.service');

jest.mock('../../startup/firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      where: jest.fn(() => ({
        limit: jest.fn(() => ({
          get: jest.fn(() => ({
            empty: false,
            docs: [
              {
                id: 'userId',
                data: jest.fn(() => ({
                  name: 'John Doe',
                  email: 'johndoe@example.com',
                })),
              },
            ],
          })),
        })),
      })),
      doc: jest.fn(() => ({
        update: jest.fn(),
      })),
    })),
  },
  FieldValue: {
    serverTimestamp: jest.fn(),
  },
}));

jest.mock('../../helpers/notification', () =>
  jest.fn(() => ({
    message: 'Reset password email sent successfully',
  }))
);

jest.mock('generate-password', () => ({
  generate: jest.fn(() => 'mockedTemporaryPassword'),
}));

describe('resetPassword function', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        email: 'johndoe@example.com',
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should reset password and send notification successfully', async () => {
    bcrypt.genSalt = jest.fn().mockResolvedValue('mockedSalt');
    bcrypt.hash = jest.fn().mockResolvedValue('mockedHash');

    const now = 'mockedTimestamp';
    generator.generate = jest.fn(() => 'mockedTemporaryPassword');

    const expectedResponse = {
      message: 'Reset password email sent successfully',
    };

    const expectedUpdate = {
      password: null,
      temporary_password: 'mockedHash',
      modified_at: now,
    };

    const originalServerTimestamp = require('../../startup/firebase').FieldValue.serverTimestamp;
    require('../../startup/firebase').FieldValue.serverTimestamp = jest.fn(() => now);

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});
