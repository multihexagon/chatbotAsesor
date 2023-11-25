import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./chat.css";
import { useChatContext } from "../context/useChatContext";
import RenderMessages from "./messages";

const getUser = async () => {
  let user = localStorage.getItem("user");
  if (!user) {
    const req = await fetch("https://randomuser.me/api/");

    const res = await req.json();

    const {
      login: { username },
    } = res.results[0];

    user = username;
    localStorage.setItem("user", user);
  }

  return user;
};

const socket = io("http://localhost:3000", {
  auth: { token: await getUser() },
  role: "adviser",
});

function addMessage(text, currentChat, setter) {
  if (text === "" || text.startsWith(" ")) return;
  const newMessage = {
    from: "client",
    text,
  };
  setter((lastValue) => {
    const messages = [...lastValue.chats[currentChat].messages, newMessage];

    return {
      ...lastValue,
      chats: { ...lastValue.chats, [currentChat]: { messages } },
      currentMessage: "",
    };
  });
  // socket.emit("new message adviser", { message: newMessage });
}

const RenderTabs = ({ chats, activeChat, setChat }) => {
  return Object.keys(chats).map((chatId) => (
    <div
      key={chatId}
      onClick={() =>
        setChat((lastValue) => ({ ...lastValue, currentChat: chatId }))
      }
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

const Chat = () => {
  const { chatData, setChatData } = useChatContext();

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // socket.emit("join", { room: "asesor" });
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [chatData]);

  useEffect(() => {}, []);

  return (
    <main style={{ display: "flex" }}>
      {/* Sidebar with tabs */}
      <article style={{ width: "200px", borderRight: "1px solid #ccc" }}>
        <RenderTabs chats={chatData.chats} activeChat={chatData.currentChat} setChat={setChatData} />
      </article>
      {/* Chat messages */}
      <article
        style={{
          flex: "1",
          maxWidth: "400px",
          margin: "auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          ref={messagesContainerRef}
          style={{
            height: "300px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            overflowY: "scroll",
            padding: "10px",
          }}
        >
          <RenderMessages chats={chatData.chats[chatData.currentChat]} />
        </div>
        <div style={{ marginTop: "10px", display: "flex" }}>
          <input
            id="messageInput"
            type="text"
            placeholder="Type your message..."
            style={{
              flex: "1",
              marginRight: "10px",
              padding: "5px",
              outline: "none",
            }}
            value={chatData.currentMessage}
            onChange={(e) =>
              setChatData((lastValue) => ({
                ...lastValue,
                currentMessage: e.target.value,
              }))
            }
            onKeyDown={(e) => {
              if (e.which === 13 && !e.shiftKey) {
                e.preventDefault();
                addMessage(chatData.currentMessage, chatData.currentChat, setChatData);
                return;
              }
            }}
          />
          <button
            style={{ padding: "5px", cursor: "pointer" }}
            className="button"
            onClick={() =>
              addMessage(chatData.currentMessage, chatData.currentChat, setChatData)
            }
          >
            <svg
              height="24"
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
      </article>
    </main>
  );
};

export default Chat;
