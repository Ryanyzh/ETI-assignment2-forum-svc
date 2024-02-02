const express = require('express');
const firebaseAdmin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Initialize Firebase Admin SDK
const firebaseAdminConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
};

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseAdminConfig)
});

// Get a Firestore instance
const firestore = firebaseAdmin.firestore();

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});