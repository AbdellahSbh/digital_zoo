import React, { useState } from "react";
import { loginUser } from "../api";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(username, password)
      .then((response) => {
        setUser({ token: response.data.token, role: response.data.role });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
      })
      .catch((err) => alert("Invalid credentials"));
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
