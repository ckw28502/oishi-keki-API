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

export { io, setupSocket };
