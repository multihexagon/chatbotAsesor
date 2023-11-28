import "./messages.css";

const RenderMessages = ({ chats }) => {
  return chats?.messages
    ? chats.messages.map((message, index) => (
        <div
          key={index + message.text}
          className={`chat-message ${message.from === "user" ? "user" : ""}`}
        >
          {message.text}
        </div>
      ))
    : null;
};

export default RenderMessages;
