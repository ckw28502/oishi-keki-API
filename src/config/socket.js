import { Server } from "socket.io";

let io;

/**
 * Initializes the Socket.IO server instance using the provided HTTP server.
 * 
 * @param {import('http').Server} httpServer - The HTTP server to bind the Socket.IO server to.
 */
const setupSocket = (httpServer) => {
    io = new Server(httpServer);
}

/**
 * Gets the Socket.IO server instance.
 * 
 * @returns {Server} The Socket.IO server instance.
 * @throws Will throw an error if the server has not been initialized.
 */
const getIo = () => {
    if (!io) {
        throw new Error("Socket.IO server not initialized. Call setupSocket first.");
    }
    return io;
};

export { getIo, setupSocket };
