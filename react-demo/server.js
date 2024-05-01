// Import required modules
import { WebSocket, WebSocketServer } from 'ws';
import http from 'http';

// Create an HTTP server and a WebSocket server
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;

// Start the WebSocket server
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

// Handle new client connections
wsServer.on("connection", function handleNewConnection(connection) {
  console.log("Received a new connection");

  // just printing to terminal any messages that it receives
  connection.on("message", (message) =>
    processReceivedMessage(message),
  );
  connection.on("close", () => handleClientDisconnection(userId));
});

// Handle incoming messages from clients
function processReceivedMessage(message) {
    console.log(message.toString());
  }