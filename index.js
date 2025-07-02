import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Load environment variables from a .env file into process.env
dotenv.config();

const app = express();

// Use the PORT value from environment variables or default to "3000" if not set
const PORT = process.env.PORT || "3000";

// Middleware setup

// Enable CORS (Cross-Origin Resource Sharing) to allow your API to accept requests from different origins
app.use(cors());

// Built-in middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Helmet helps secure your Express app by setting various HTTP headers
// It protects against well-known web vulnerabilities by setting appropriate headers
app.use(helmet());

// Disable the 'X-Powered-By' header to prevent exposing that the server is running Express
app.disable('x-powered-by');

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
