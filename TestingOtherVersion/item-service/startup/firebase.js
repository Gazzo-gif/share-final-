var admin = require("firebase-admin");
const { Filter, FieldValue, FieldPath } = require('firebase-admin/firestore');

var serviceAccount = require("./share-app-196b2-firebase-adminsdk-yvls2-a96a359fce.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://share-app-196b2.appspot.com',
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, bucket, Filter, FieldValue, FieldPath };