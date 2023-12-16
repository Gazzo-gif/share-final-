var admin = require('firebase-admin');
const { Filter, FieldValue, FieldPath } = require('firebase-admin/firestore');

var serviceAccount = require('./share-test-c2b38-firebase-adminsdk-fgon2-a9955db3e1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://share-app-test-b5f56.appspot.com'
});

const testDb = admin.firestore();
const testBucket = admin.storage().bucket();

module.exports = { testDb, testBucket, Filter, FieldValue, FieldPath };
