import { v2 as cloudinary } from 'cloudinary';
import env from './env.js';

// Configure Cloudinary SDK with credentials from environment variables
cloudinary.config({
    // Your Cloudinary cloud name (account identifier)
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    
    // API key for authenticating requests
    api_key: env.CLOUDINARY_API_KEY,
    
    // API secret for secure authentication (keep this private)
    api_secret: env.CLOUDINARY_API_SECRET,
    
    // Enforce HTTPS URLs for secure uploads and downloads
    secure: true 
});

export default cloudinary;
