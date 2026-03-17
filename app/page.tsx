"use client";
import { useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const send = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: msg }),
    });
    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Bukan 110 Polri</h1>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={send}>Kirim</button>
      <p>{reply}</p>
    </div>
  );
}