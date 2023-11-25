import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'Usuario', text: 'Hola buen día, tengo un problema con mi suscripción!' },
    { sender: 'Tú', text: 'Hola buenos dias, claro que sí, será un placer ayudarte' },
  ]);

  const messagesContainerRef = useRef(null);

  const renderMessages = () => {
    return messages.map((message, index) => (
      <div
        key={index}
        style={{ marginBottom: '10px', textAlign: message.sender === 'Usuario' ? 'left' : 'right', backgroundColor: message.sender === 'Usuario' ? '#eee' : '#0084ff', color: message.sender === 'Usuario' ? '#000' : '#fff', padding: '10px', borderRadius: '5px' }}
      >
        <strong>{message.sender}:</strong> {message.text}
      </div>
    ));
  };

  const handleSendMessage = () => {
    const inputElement = document.getElementById('messageInput');
    const newMessage = { sender: 'Tú', text: inputElement.value };
    setMessages([...messages, newMessage]);
    inputElement.value = ''; 
  };

  useEffect(() => {

    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
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
        <button style={{ padding: '5px', cursor: 'pointer' }} onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
