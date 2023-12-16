const httpStatus = require('http-status-codes').StatusCodes;
const { db } = require('../startup/firebase');

const getItems = async (req, res) => {
  const itemRef = await db.collection(process.env.ITEMS_DOC).get();

  if (itemRef.empty) {
    return res.status(httpStatus.NOT_FOUND).json({ error: 'Items not found' });
  }

  const itemsData = [];
  itemRef.forEach((itemDoc) => {
    const itemData = itemDoc.data();
    itemsData.push({ id: itemDoc.id, ...itemData });
  });

  res.status(httpStatus.OK).json(itemsData);
};

module.exports = getItems;
