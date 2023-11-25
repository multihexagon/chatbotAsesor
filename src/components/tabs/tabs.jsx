import React from "react";
import "./tabs.css";

const RenderTabs = ({ chats, activeChat, setChat }) => {
    return Object.keys(chats).map((chatId) => (
      <div
        key={chatId}
        onClick={() =>
          setChat((lastValue) => ({ ...lastValue, currentChat: chatId }))
        }
        className="tab"
        style={{
          border:
            activeChat === chatId ? "2px solid #8653B1" : "2px solid transparent",
          borderBottom:
            activeChat === chatId ? "2px solid #A749FE" : "1px solid #A2A2A2",
          backgroundColor: 
            activeChat === chatId ? "#69468C" : "#363535",
          color:"#fff", 
          cursor: "pointer",
        }}
      >
        {chatId}
      </div>
    ));
  };

export default RenderTabs;