const bcrypt = require('bcrypt');
const httpStatus = require('http-status-codes').StatusCodes;
const changePassword = require('../../controllers/changePassword.service');
require('dotenv').config();

jest.mock('../../startup/firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => ({
          exists: true,
          data: () => ({
            password: '$2b$10$5UXBi1oUzgAYQKcvYEmn2eMMS4Mj.5NNosF0obx1lhEvlhxw0W6lG',
          }),
        })),
        update: jest.fn(),
      })),
    })),
  },
  FieldValue: {
    serverTimestamp: jest.fn(() => 'mockedServerTimestamp'),
  },
}));

describe('changePassword function', () => {
  it('should change the password successfully', async () => {
    const req = {
      body: {
        currentPassword: 'oldPassword',
        newPassword: 'newPassword',
      },
      user: {
        id: 'mockedUserId',
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    bcrypt.compare = jest.fn(() => true);
    bcrypt.genSalt = jest.fn(() => 'mockedSalt');
    bcrypt.hash = jest.fn(() => 'mockedHashedPassword');

    await changePassword(req, res);
    
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ message: 'Password changed successfully' });
  });
});
