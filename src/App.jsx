import Chat from "./components/chat/chat";
import Header from "./components/header/header";
import { useChatContext } from "./context/useChatContext";
import Login from "./components/login/login";

function App() {
  const { chatData } = useChatContext();
  return (
    <>
      <Header />
      {
        chatData.loggedIn !== null ? <Chat/> : <Login/>
      }
    </>
  );
}

export default App;
