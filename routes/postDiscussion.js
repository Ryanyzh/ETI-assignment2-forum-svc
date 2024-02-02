const express = require('express');
const router = express.Router();
const firebaseAdmin = require('firebase-admin');

// Access Firestore instance
const firestore = firebaseAdmin.firestore();

// Define a middleware function to log request information
function requestLogger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

// Apply the requestLogger middleware to all routes
router.use(requestLogger);

// Add body parsing middleware
router.use(express.json());

// Route to add a new forum to the "forum" collection
router.post('/', async (req, res) => {
    try {
        const forumData = req.body;

        // Check if the "forum" collection exists
        const forumCollectionRef = firestore.collection('forum');
        const forumSnapshot = await forumCollectionRef.get();

        if (forumSnapshot.empty) {
            // Add the new forum data to Firestore
            await forumCollectionRef.add(forumData);

            res.status(201).send('Forum added successfully.');
        } else {

            // Add the new forum data to Firestore
            await forumCollectionRef.add(forumData);

            res.status(408).send('Forum collection already contains data.');
        }
    } catch (error) {
        console.error('Error adding forum:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
