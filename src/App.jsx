// Import necessary libraries
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Connect to the backend Socket.IO server
const socket = io('http://localhost:3000');

const App = () => {
  const [userId, setUserId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Array to store received messages

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Handle recipient not found
    socket.on('user_not_found', (data) => {
      alert(`${data.recipientId} is not online: ${data.message}`);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('receive_message');
      socket.off('user_not_found');
    };
  }, []);

  const handleRegister = () => {
    if (userId.trim()) {
      socket.emit('register', userId);
      alert(`Registered with userId: ${userId}`);
    } else {
      alert('Please enter a valid userId');
    }
  };

  const handleSendMessage = () => {
    if (recipientId.trim() && message.trim()) {
      socket.emit('private_message', {
        senderId: userId,
        recipientId,
        message,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: 'You', message },
      ]);
      setMessage('');
    } else {
      alert('Please enter a recipientId and a message');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Socket.IO Chat App</h1>

      {/* User Registration */}
      <div>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Enter your userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>

      {/* Message Sending */}
      <div>
        <h2>Send Private Message</h2>
        <input
          type="text"
          placeholder="Recipient userId"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      {/* Message Display */}
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.senderId}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
