const express = require('express');
const router = express.Router();
const cors = require('cors');

// Include routes
const postForumRoutes = require('./postDiscussion');
const getForumRoutes = require('./getDiscussion');

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Whitelist localhost:3000
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use CORS middleware with specified options
router.use(cors(corsOptions));

// Mount routes
router.use('/postForum', postForumRoutes);
router.use('/getForum', getForumRoutes);

module.exports = router;