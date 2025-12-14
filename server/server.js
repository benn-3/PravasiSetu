const dotenv = require('dotenv');
// Load env vars
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Force port 5001 if env is 5000 (AirPlay conflict)
const envPort = process.env.PORT;
const PORT = (envPort && envPort != 5000) ? envPort : 5001;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
