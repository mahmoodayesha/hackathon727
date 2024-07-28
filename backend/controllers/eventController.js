const axios = require('axios');
const geohash = require('ngeohash');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

const getEventsByGeoPoint = async (req, res) => {
    try {
        const { lat, long } = req.query;

        if (!lat || !long) {
            return res.status(400).json({ message: 'Please provide both latitude and longitude.' });
        }

        const geoHashEx = geohash.encode(lat, long);

        const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geoHashEx}&apikey=${API_KEY}`);
        const events = response.data._embedded?.events;

        if (events && events.length > 0) {
            res.json(events);
        } else {
            res.status(404).json({ message: 'No events found for the given geoPoint.' });
        }
    } catch (error) {
        console.error('Error fetching events:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getEventsByGeoPoint,
};
