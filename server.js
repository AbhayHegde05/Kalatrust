// server.js
require('dotenv').config();             // 1. Load .env variables
const connectDB      = require('./src/config/database');
const app            = require('./src/app');

connectDB();                            // 2. Establish MongoDB connection

const PORT = process.env.PORT || 3000;  // 3. Start Express
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
