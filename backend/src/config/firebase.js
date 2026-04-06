const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
// Note: You need to download your service account key from Firebase Console
// and place it in the root of your backend folder as 'serviceAccountKey.json'
// or set the GOOGLE_APPLICATION_CREDENTIALS environment variable.

const serviceAccount = require(path.join(process.cwd(), 'serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

console.log('✔️  Firebase Admin initialized successfully.');

module.exports = { admin, db, auth };
