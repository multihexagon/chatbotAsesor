import { useContext, createContext, useState } from "react";

const ChatContext = createContext({});

export const useChatContext = () => useContext(ChatContext);

export default function ChatContextProvider({ children }) {
  const [chatData, setChatData] = useState({
    currentChat: "",
    currentMessage: "",
    chats: {
      beautifulbear436 : {
        messages: [
        ],
      },
      juan: {
        messages: [],
      },
    },
  });

  return (
    <ChatContext.Provider value={{ chatData, setChatData }}>
      {children}
    </ChatContext.Provider>
  );
}
