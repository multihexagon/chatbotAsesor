//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ChatContextProvider from "./context/useChatContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ChatContextProvider>
    <App />
  </ChatContextProvider>
);
