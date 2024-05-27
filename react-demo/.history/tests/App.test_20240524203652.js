import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';
import { Server } from 'mock-socket';

// Mock WebSocket server URL
const MOCK_URL = 'ws://localhost:8080';

// Mock WebSocket server
const mockServer = new Server(MOCK_URL);

// Mock message to send to WebSocket
const mockMessage = [
    {
      prompt: "Mock prompt 1",
      animation: "Mock animation 1"
    },
    {
      prompt: "Mock prompt 2",
      animation: "Mock animation 2"
    }
  ];

// Test case
test('renders WebSocket message', async () => {
  // Render the component
  render(<App />);

  // Wait for WebSocket connection to open
  await waitFor(() => {
    expect(mockServer.clients().length).toBe(1); // Ensure a client is connected
  });

  // Send mock message to WebSocket
  mockServer.send(JSON.stringify(mockMessage));

  // Wait for the message to be displayed in the component
  await waitFor(() => {
    expect(screen.getByText(mockMessage.prompt)).toBeInTheDocument();
    expect(screen.getByText(mockMessage.animation)).toBeInTheDocument();
  });
});