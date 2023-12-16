var admin = require('firebase-admin');
const { Filter, FieldValue, FieldPath } = require('firebase-admin/firestore');

var serviceAccount = require('./share-app-test-b5f56-firebase-adminsdk-49t7g-dd1951de23.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://share-app-test-b5f56.appspot.com'
});

const testDb = admin.firestore();
const testBucket = admin.storage().bucket();

module.exports = { testDb, testBucket, Filter, FieldValue, FieldPath };
