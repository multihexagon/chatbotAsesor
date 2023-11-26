import React from "react";
import "./tabs.css";

const RenderTabs = ({ chats, activeChat, setChat, socket }) => {
  function handleClick(chatId) {
    setChat((lastValue) => ({ ...lastValue, currentChat: chatId }));
    socket.emit("enter room", {
      room: chatId,
      last: activeChat != "" && activeChat != chatId && activeChat,
    });
  }

  return Object.keys(chats).map((chatId) => (
    <div
      key={chatId}
      onClick={() => handleClick(chatId)}
      style={{
        padding: "10px",
        borderBottom:
          activeChat === chatId ? "2px solid #4CAF50" : "2px solid transparent",
        cursor: "pointer",
      }}
    >
      {chatId}
    </div>
  ));
};

export default RenderTabs;
