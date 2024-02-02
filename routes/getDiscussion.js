const express = require('express');
const router = express.Router();

// Access Firestore instance
const firestore = require('firebase-admin').firestore();

// Define a middleware function to log request information
function requestLogger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

// Apply the requestLogger middleware to all routes
router.use(requestLogger);

// Only execute this route handler when a GET request is made to '/sdg'
router.get('/', async (req, res) => {
    try {
        const data = [];
        // Fetch data from Firestore
        const snapshot = await firestore.collection('forum').get();
        snapshot.forEach(doc => {
            // Construct object with document ID and data
            const forumData = doc.data();
            const forumWithId = {
                id: doc.id,
                ...forumData
            };
            data.push(forumWithId);
        });
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route handler to get forum details based on document ID
router.get('/:forumId', async (req, res) => {
    try {
        const forumId = req.params.forumId;

        // Fetch forum details from Firestore based on the provided document ID
        const forumDoc = await firestore.collection('forum').doc(forumId).get();

        if (!forumDoc.exists) {
            // If forum document does not exist
            return res.status(404).send('Forum not found.');
        }

        // Get forum data
        const forumData = forumDoc.data();

        // Send forum data as JSON response
        res.json(forumData);
    } catch (error) {
        console.error('Error fetching forum data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
