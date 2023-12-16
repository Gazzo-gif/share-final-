const httpStatus = require('http-status-codes').StatusCodes;
const addItem = require('../../controllers/addItem.service');
const updateMyItem = require('../../controllers/updateMyItem.service');
const { testDb, testBucket, FieldPath, FieldValue } = require('../firebaseTest');
require('dotenv').config();

describe('Integration Test: Create and Update Item', () => {
  let createdItemId;

  afterAll(async () => {
    await testDb.collection(process.env.ITEMS_DOC).doc(createdItemId).delete();
  });

  it('should create and then update an item', async () => {
    const addItemReq = {
      body: {
        itemName: 'Test Item',
        itemDescription: 'Initial description',
        price: '100',
      },
      user: {
        id: 'testUserId',
      },
      files: '',
    };

    const addItemRes = {
      status: jest.fn(() => addItemRes),
      json: jest.fn(),
    };

    await addItem(addItemReq, addItemRes, testDb, testBucket);

    expect(addItemRes.status).toHaveBeenCalledWith(httpStatus.CREATED);
    expect(addItemRes.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Item created successfully',
      item: {
        id: expect.any(String),
        ownerId: addItemReq.user.id,
        itemName: addItemReq.body.itemName,
        itemDescription: addItemReq.body.itemDescription,
        price: 100,
        photos: undefined,
        unavailabeDurations: [],
      },
    }));

    createdItemId = addItemRes.json.mock.calls[0][0].item.id;

    const updateItemReq = {
      params: {
        id: createdItemId,
      },
      body: {
        itemName: 'Updated Item',
        itemDescription: 'Updated description',
        price: '200',
        unavailabeDurations: '2024-01-01',
      },
      user: {
        id: 'testUserId',
      },
    };

    const updateItemRes = {
      status: jest.fn(() => updateItemRes),
      json: jest.fn(),
    };

    await updateMyItem(updateItemReq, updateItemRes, testDb, FieldPath, FieldValue);

    expect(updateItemRes.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(updateItemRes.json).toHaveBeenCalledWith(expect.objectContaining({
      id: createdItemId,
      ownerId: updateItemReq.user.id,
      itemName: updateItemReq.body.itemName,
      itemDescription: updateItemReq.body.itemDescription,
      price: 200,
      unavailabeDurations: ['2024-01-01'],
    }));
  });
});
