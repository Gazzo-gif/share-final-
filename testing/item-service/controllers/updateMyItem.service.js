const httpStatus = require('http-status-codes').StatusCodes;

const updateMyItem = async (req, res, database, FieldPath, FieldValue) => {
  const itemId = req.params.id;
  const { itemName, itemDescription, price, unavailabeDurations } = req.body;

  const itemRef = await database
    .collection(process.env.ITEMS_DOC)
    .where('ownerId', '==', req.user.id)
    .where(FieldPath.documentId(), '==', itemId)
    .limit(1)
    .get();

  if (itemRef.empty) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ error: 'Item not found for the user' });
  }

  const itemDocRef = itemRef.docs[0].ref;

  const updateObj = {};
  if (itemName) updateObj.itemName = itemName;
  if (itemDescription) updateObj.itemDescription = itemDescription;
  if (price) updateObj.price = parseInt(price);
  if (unavailabeDurations) updateObj.unavailabeDurations = FieldValue.arrayUnion(unavailabeDurations);

  await itemDocRef.update(updateObj);

  const updatedItemDoc = await itemDocRef.get();
  const updatedItemData = updatedItemDoc.data();

  res
    .status(httpStatus.OK)
    .json({ id: updatedItemDoc.id, ...updatedItemData });
};

module.exports = updateMyItem;
