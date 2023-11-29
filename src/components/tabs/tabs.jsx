// import "./tabs.css";

const RenderTabs = ({ chats, activeChat, setChat, socket }) => {
  async function handleClick(chatId) {
    if (chatId === activeChat) return;

    const data = await fetch(`http://localhost:3000/${chatId}`);
    let messages = [];

    if (data.ok) {
      const chat = await data.json();
      messages = Object.values(chat);
    }

    socket.emit("enter room", {
      room: chatId,
      last: activeChat,
    });

    setChat((lastValue) => ({
      ...lastValue,
      currentChat: chatId,
      chats: {
        ...lastValue.chats,
        [chatId]: { messages, alert: '' },
      },
    }));
  }

  return Object.keys(chats).map((chatId) => (
    <div
      className={`clients ${chatId === activeChat && "selected"}`}
      key={chatId}
      onClick={() => handleClick(chatId)}
    >
      {chatId} {chats[chatId].alert}
    </div>
  ));
};

export default RenderTabs;
