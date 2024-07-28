const express = require('express');
const app = express();
const eventRoutes = require('./routes/eventRoutes');

app.use(express.json());

app.use('/api', eventRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
