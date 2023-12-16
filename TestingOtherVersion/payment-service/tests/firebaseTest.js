var admin = require('firebase-admin');
const { Filter, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require('./share-test-c2b38-firebase-adminsdk-fgon2-a9955db3e1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const testDb = admin.firestore();

module.exports = { testDb, Filter, FieldValue };
