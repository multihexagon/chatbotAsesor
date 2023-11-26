import { createRoot } from "react-dom/client";
import App from "./App";
import ChatContextProvider from "./context/useChatContext";

createRoot(document.getElementById("root")).render(
  <ChatContextProvider>
    <App />
  </ChatContextProvider>
);
