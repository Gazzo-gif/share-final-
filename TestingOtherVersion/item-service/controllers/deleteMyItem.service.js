const httpStatus = require('http-status-codes').StatusCodes;

const deleteMyItem = async (req, res, database, FieldPath) => {
  const itemId = req.params.id;

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
  const itemDoc = await itemDocRef.get();

  await database
    .collection(process.env.ITEMS_DOC)
    .doc(itemDoc.id)
    .delete();

  res.status(httpStatus.NO_CONTENT).json();
};

module.exports = deleteMyItem;
