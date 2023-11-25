import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";
import './chat.css';

const getUser = async() => {

  let user = localStorage.getItem('user')
  if (!user){
    const req = await fetch('https://randomuser.me/api/')

    const res = await req.json()

    const {login : {username} } = res.results[0]

    user = username
    localStorage.setItem('user',user)
  }

  return user

};
const socket = io("http://localhost:3000", { auth: { token: await getUser() } });

const Chat = () => {
  const [activeChat, setActiveChat] = useState('Chat1'); // Default active chat
  const [chats, setChats] = useState({
    Chat1: [
      { from: 'Usuario', text: 'Hello! How can I help you today?' },
      { from: 'You', text: 'Hi there! I have a question.' },
    ],
    Chat2: [
      { from: 'Usuario', text: 'Welcome to Chat 2!' },
      { from: 'You', text: 'How can I assist you?' },
    ],
    // Add more chats as needed
  });

  const messagesContainerRef = useRef(null);

  const renderMessages = () => {
    const currentChat = chats[activeChat] || [];
    return currentChat.map((message, index) => (
      <div
        key={index}
        style={{ marginBottom: '10px', textAlign: message.from === 'Usuario' ? 'left' : 'right', backgroundColor: message.from === 'Usuario' ? '#eee' : '#0084ff', color: message.from === 'Usuario' ? '#000' : '#fff', padding: '10px', borderRadius: '5px' }}
      >
        <strong>{message.from}:</strong> {message.text}
      </div>
    ));
  };

  function addMessage(text, setter) {
    if (text === "" || text.startsWith(" ")) return;
    const newMessage = {
      from: "user",
      text,
    };
    setter((lastValue) => ({
      ...lastValue,
      messages: [...lastValue.messages, newMessage],
      currentMessage: "",
    }));
    socket.emit("new message", { message: newMessage, userType: 'user' });
  }

  const handleSendMessage = () => {
    const inputElement = document.getElementById('messageInput');
    const newMessage = { from: 'Tú', text: inputElement.value };
    setMessages([...messages, newMessage]);
    inputElement.value = '';
    socket.emit("new message", { message: newMessage, userType: 'adviser' });
  };


  useEffect(() => {
    socket.emit("join", { room: 'asesor' });
    // Scroll to the bottom when messages change
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
