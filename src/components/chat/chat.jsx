import { useEffect, useRef } from "react";
//import { io } from "socket.io-client";
import "./chat.css";
import { useChatContext } from "../../context/useChatContext";
import RenderMessages from "../messages/messages";
import RenderTabs from "../tabs/tabs";

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

//const socket = io("http://localhost:3000", {
//  auth: { token: await getUser() },
//  role: "adviser",
//});

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
      <article className="article" style={{borderRight: "1px solid #9966CC" }}>
        <RenderTabs chats={chatData.chats} activeChat={chatData.currentChat} setChat={setChatData} />
      </article>
      {/* Chat messages */}
      <article
        className="article-big"
        style={{
          flex: "1",
          maxWidth: "800px",
          margin: "auto",
          fontFamily: "Arial, sans-serif",
          border: "none",
          marginTop: "45vh",
        }}
      >
        <div
          className="messages-container"
          ref={messagesContainerRef}
          style={{
            height: "300px",
            borderRadius: "5px",
            overflowY: "scroll",
            padding: "10px"
          }}
        >
          <RenderMessages chats={chatData.chats[chatData.currentChat]} />
        </div>
        <div style={{ marginTop: "20px", display: "flex" }}>
          <input
            id="messageInput"
            type="text"
            placeholder="Type your message..."
            style={{
              flex: "1",
              color: "#fff",
              height: "30px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px 0 0 5px",
              backgroundColor: "transparent",
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
