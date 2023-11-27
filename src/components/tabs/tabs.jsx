// import "./tabs.css";

const RenderTabs = ({ chats, activeChat, setChat, socket }) => {
  async function handleClick(chatId) {
    const data = await fetch(`http://localhost:3000/${chatId}`);
    let messages = [];

    if (data.ok) {
      const chat = await data.json();
      messages = Object.values(chat);
    }

    setChat((lastValue) => ({
      ...lastValue,
      currentChat: chatId,
      chats: {
        ...lastValue.chats,
        [chatId]: { messages },
      },
    }));
    socket.emit("enter room", {
      room: chatId,
      last: activeChat != "" && activeChat != chatId && activeChat,
    });
  }

  return Object.keys(chats).map((chatId) => (
    <div
      className={`clients ${chatId === activeChat && "selected"}`}
      key={chatId}
      onClick={() => handleClick(chatId)}
      // style={{
      //   padding: "10px",
      //   // borderBottom:
      //   //   activeChat === chatId ? "2px solid #4CAF50" : "2px solid transparent",

      //   cursor: "pointer",
      // }}
    >
      {chatId}
    </div>
  ));
};

export default RenderTabs;
