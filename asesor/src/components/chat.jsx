import React, { useState, useEffect, useRef } from 'react';
import './chat.css';

const Chat = () => {
  const [activeChat, setActiveChat] = useState('Chat1');
  const [chats, setChats] = useState({
    Chat1: [
      { sender: 'Usuario', text: 'Hello! How can I help you today?' },
      { sender: 'You', text: 'Hi there! I have a question.' },
    ],
    Chat2: [
      { sender: 'Usuario', text: 'Welcome to Chat 2!' },
      { sender: 'You', text: 'How can I assist you?' },
    ],
  });

  const messagesContainerRef = useRef(null);

  const renderMessages = () => {
    const currentChat = chats[activeChat] || [];
    return currentChat.map((message, index) => (
      <div
        key={index}
        style={{ marginBottom: '10px', textAlign: message.sender === 'Usuario' ? 'left' : 'right', backgroundColor: message.sender === 'Usuario' ? '#eee' : '#375EFC', padding: '5px', borderRadius: '5px', color: message.sender === 'Usuario' ? '#000' : '#fff' }}
      >
        <strong>{message.sender}:</strong> {message.text}
      </div>
    ));
  };

  const handleSendMessage = () => {
    const inputElement = document.getElementById('messageInput');
    const currentChat = chats[activeChat] || [];
    const newMessage = { sender: 'You', text: inputElement.value };
    setChats({ ...chats, [activeChat]: [...currentChat, newMessage] });
    inputElement.value = '';
  };

  useEffect(() => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [chats, activeChat]);

  const handleTabClick = (chatId) => {
    setActiveChat(chatId);
  };

  const renderTabs = () => {
    return Object.keys(chats).map((chatId) => (
      <div
        key={chatId}
        onClick={() => handleTabClick(chatId)}
        style={{
          padding: '10px',
          borderBottom: activeChat === chatId ? '2px solid #4CAF50' : '2px solid transparent',
          cursor: 'pointer',
        }}
      >
        {chatId}
      </div>
    ));
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar with tabs */}
      <div style={{ width: '200px', borderRight: '1px solid #ccc' }}>
        {renderTabs()}
      </div>
      {/* Chat messages */}
      <div style={{ flex: '1', maxWidth: '400px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
        <div
          ref={messagesContainerRef}
          style={{
            height: '300px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            overflowY: 'scroll',
            padding: '10px',
          }}
        >
          {renderMessages()}
        </div>
        <div style={{ marginTop: '10px', display: 'flex' }}>
          <input
            id="messageInput"
            type="text"
            placeholder="Type your message..."
            style={{ flex: '1', marginRight: '10px', padding: '5px' }}
          />
          <button style={{ padding: '5px', cursor: 'pointer' }} className='button' onClick={handleSendMessage}>
          <svg  height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  fill="currentColor"
                ></path>
              </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
