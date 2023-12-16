const httpStatus = require('http-status-codes').StatusCodes;
const sendDamageClaimEmail = require('../../helpers/sendDamageClaimEmail.service');
const notifyDamageClaim = require('../../controllers/notifyDamageClaim.service');
require('dotenv').config();

jest.mock('../../helpers/sendDamageClaimEmail.service', () => jest.fn());
jest.mock('../../helpers/websocketNotifier.service', () => ({
  sendNotification: jest.fn(),
}));

describe('notifyDamageClaim function', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        borrowerEmail: 'gazzobahman531@gmail.com',
        borrowerName: 'Borrower',
        lenderName: 'Lender',
        itemName: 'Item',
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

  it('should notify about damage claim and send email successfully', async () => {
    sendDamageClaimEmail.mockResolvedValue({ status: true, message: 'Email sent' });

    await notifyDamageClaim(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email sent' });
  });
});
