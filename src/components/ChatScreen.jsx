import React, { useContext, useState } from "react";
import { ChatContext } from "./ChatContext";

const ChatScreen = () => {
  const { messages, addMessage } = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addMessage({ text: newMessage, id: Date.now() });
      setNewMessage(""); // Clear the input field after sending
    }
  };

  return (
    <div className="chat-screen">
      <div className="message-list">
        {messages.map((message) => (
          <div key={message.id} className="message">
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;
