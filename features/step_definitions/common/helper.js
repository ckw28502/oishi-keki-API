import request from 'supertest';
import app from '../../../index.js';

/**
 * Supported HTTP methods for requests.
 * Extend this object if you need to support other methods (e.g., GET, PUT, DELETE).
 */
const Methods = {
    Get: "GET",
    Post: "POST",
    Put: "PUT",
    Delete: "DELETE"
};

/**
 * Sends an HTTP request to the specified path using the given method.
 *
 * @param {string} path - The API endpoint to send the request to (e.g., "/cakes").
 * @param {string} method - The HTTP method to use (e.g., "POST"). Must be one of the values in the `Methods` object.
 * @param {object} data - The request body/params to send with the request.
 * @param {string} [authHeader=""] - Optional Authorization header value (e.g., "Bearer <token>"). Defaults to an empty string.
 *
 * @returns {Promise<object|undefined>} - The response object from the server, or `undefined` if method is unsupported.
 */
const sendRequest = async (path, method, data, authHeader = "") => {
    const req = request(app);
    
    switch (method) {
        case Methods.Get:
            return await req.get(path)
                .query(data)
                .set('Accept', 'application/json')
                .set('Authorization', authHeader || "");
                
        case Methods.Post:
            return await req.post(path)
                .send(data)
                .set('Accept', 'application/json')
                .set('Authorization', authHeader || "");

        case Methods.Put:
            return await req.put(path)
                .send(data)
                .set('Accept', 'application/json')
                .set('Authorization', authHeader || "");
        
        case Methods.Delete:
            return await req.delete(path)
                .send(data)
                .set('Accept', 'application/json')
                .set('Authorization', authHeader || "");

        default:
            // You can log or throw here for unsupported methods
            return;
    }
};

export {
    Methods,
    sendRequest
};
