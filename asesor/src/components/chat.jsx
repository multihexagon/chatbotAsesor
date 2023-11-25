import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";
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
  const [messages, setMessages] = useState([
    { from: 'Usuario', text: 'Hola buen día, tengo un problema con mi suscripción!' },
    { from: 'Tú', text: 'Hola buenos dias, claro que sí, será un placer ayudarte' },
  ]);

  const messagesContainerRef = useRef(null);

  const renderMessages = () => {
    return messages.map((message, index) => (
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
