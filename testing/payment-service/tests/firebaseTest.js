var admin = require('firebase-admin');
const { Filter, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require('./share-app-test-b5f56-firebase-adminsdk-49t7g-dd1951de23.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const testDb = admin.firestore();

module.exports = { testDb, Filter, FieldValue };
