// Middleware for handling errors in the Express application
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;

    console.error(`Error: ${err}`);

    // Set the response status code and send a JSON response
    res.status(statusCode).json({
        error: {
            status: statusCode,
            message: err.message || 'Internal Server Error',
        }
    });
}

export default errorHandler;