const RenderMessages = ({ chats }) => {
  return chats?.messages ? chats.messages.map((message, index) => (
    <div
      key={index}
      style={{
        marginBottom: "10px",
        textAlign: message.from === "Usuario" ? "left" : "right",
        backgroundColor: message.from === "Usuario" ? "#eee" : "#9966CC",
        color: message.from === "Usuario" ? "#000" : "#fff",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <strong>{message.from}:</strong> {message.text}
    </div>
  )) : null;
};

export default RenderMessages;
