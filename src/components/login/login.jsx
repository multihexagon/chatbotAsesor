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

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    const req = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!req.ok) {
      alert("mal");
      return;
    }
    const { token } = await req.json();

    setChatData((lastValue) => ({ ...lastValue, loggedIn: token }));
    localStorage.setItem("token", token);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="form-title">Inicia sesión para chatear como asesor</p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter username"
          name="username"
          required
        />
        <span></span>
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          required
        />
      </div>
      <button type="submit" className="submit">
        Sign in
      </button>
    </form>
  );
}

export default Login;
