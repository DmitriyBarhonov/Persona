"use client";

import { useState } from "react";

function handleLogin(username: string) {
  console.log("login stub:", username);
}

export default function LoginPage() {
  const [username, setUsername] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(username);
      }}
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Войти</button>
    </form>
  );
}
