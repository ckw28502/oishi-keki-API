import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(helmet()); // Security middleware

app.disable('x-powered-by'); // Disable 'X-Powered-By' header for security

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});