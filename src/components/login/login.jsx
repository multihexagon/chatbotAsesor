import { useEffect } from "react";
import { useChatContext } from "../../context/useChatContext";
import "./login.css";

function Login() {
  const { setChatData } = useChatContext();

  useEffect(() => {
    const user = localStorage.getItem("token") ?? null;

    if (user != undefined) {
      setChatData((lastValue) => ({ ...lastValue, loggedIn: user }));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setChatData((lastValue) => ({ ...lastValue, loggedIn: "pepito" }));
    localStorage.setItem("token", "pepito");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="form-title">Sign in to your account</p>
      <div className="input-container">
        <input type="email" placeholder="Enter email" />
        <span></span>
      </div>
      <div className="input-container">
        <input type="password" placeholder="Enter password" />
      </div>
      <button type="submit" className="submit">
        Sign in
      </button>
    </form>
  );
}

export default Login;
