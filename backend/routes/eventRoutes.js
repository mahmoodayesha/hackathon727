const express = require('express');
const router = express.Router();
const { getEventsByGeoPoint } = require('../controllers/eventController');

router.get('/events/geopoint', getEventsByGeoPoint);

module.exports = router;
