import React from 'react';

const ChatList = ({ chats, currentChat, setChat }) => {
  return (
    <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
      <h2>Chats</h2>
      {Object.keys(chats).map((chatId) => (
        <div
          key={chatId}
          onClick={() => setChat(chatId)}
          style={{
            padding: '10px',
            cursor: 'pointer',
            borderBottom:
              currentChat === chatId ? '2px solid #4CAF50' : '2px solid transparent',
          }}
        >
          {chatId}
        </div>
      ))}
    </div>
  );
};

export default ChatList;