const httpStatus = require('http-status-codes').StatusCodes;
const registerUser = require('../../controllers/signUp.service');
const login = require('../../controllers/login.service');
const { testDb, FieldValue } = require('../firebaseTest');
const reverseGeocodeWithOpenStreetMap = require('../../helpers/location');
require('dotenv').config();

jest.mock('../../helpers/location', () => jest.fn());

afterAll(async () => {
  await testDb
    .collection(process.env.USERS_DOC)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        testDb.collection(process.env.USERS_DOC).doc(doc.id).delete();
      });
    });
});

describe('Signup and Login Integration Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should signup a user and then login successfully', async () => {
    const signupReq = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        dob: '1990-01-01',
        latitude: 51.3397,
        longitude: 12.3731,
        password: 'testpassword',
      },
    };

    const signupRes = {
      status: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    reverseGeocodeWithOpenStreetMap.mockResolvedValue({
      address: {
        city: 'Leipzig',
        country: 'Germany',
      },
    });

    await registerUser(signupReq, signupRes, testDb, FieldValue);

    expect(signupRes.status).toHaveBeenCalledWith(httpStatus.CREATED);
    expect(signupRes.json).toHaveBeenCalledWith({
      message: 'User registered successfully',
      user: {
        id: expect.any(String),
        name: 'Test User',
        email: 'test@example.com',
        dob: '1990-01-01',
        location: 'Leipzig, Germany',
      },
    });

    const loginReq = {
      body: {
        email: 'test@example.com',
        password: 'testpassword',
      },
    };

    const loginRes = {
      status: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(loginReq, loginRes, testDb);

    expect(loginRes.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(loginRes.json).toHaveBeenCalledWith({ message: 'Login Successful!' });
  });
});
