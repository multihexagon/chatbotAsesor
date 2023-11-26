import { useContext, createContext, useState } from "react";

const ChatContext = createContext({});

export const useChatContext = () => useContext(ChatContext);

export default function ChatContextProvider({ children }) {
  const [chatData, setChatData] = useState({ 
    currentChat: "ana",
    currentMessage: "",
    chats: {
      ana: {
        messages: [
          {
            from: "Usuario",
            text: "Hola mor",
          },
          {
            from: "You",
            text: "Hola mor, que más?",
          },
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
