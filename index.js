const express = require('express');
const bodyParser = require('body-parser');
const emailRoutes = require('./src/routes/routes'); // Update the path accordingly
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Use your email routes
app.use('/', emailRoutes);

// Define other routes or middleware as needed

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
