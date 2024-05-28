
// Import required modules
import { WebSocket, WebSocketServer } from 'ws';
import http from 'http';

// Create an HTTP server and a WebSocket server
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 800;

// Start the WebSocket server
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

// Handle new client connections
wsServer.on("connection", function handleNewConnection(connection) {
  console.log("Received a new connection");

  // just printing to terminal any messages that it receives
  connection.on("message", (message) =>
    processReceivedMessage(message, connection),
  );
  connection.on("close", () => handleClientDisconnection());
});

// Handle incoming messages from clients
function processReceivedMessage(message, connection) {
    console.log(message.toString());
    message = JSON.parse(message);
    if (message.type === "auth") {
      console.log("Authenticating user");
      authenticateUser(message, connection);
    } else if (message.type === "interrupt") {
      console.log("Interruption request");
    }
  }

function authenticateUser(message, connection) {
    if (message.username === "admin" && message.password === "pwd") {
        console.log("User authenticated");
        connection.send(JSON.stringify({status: "success", token: "12345"}));
    } else {
        console.log("User not authenticated");
        connection.send(JSON.stringify({status: "failure" }));
    }
}
// Handle client disconnections
function handleClientDisconnection() {
  console.log(`Client disconnected`);
}