"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const send = async () => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setReply(data.reply || "Tidak ada balasan.");
    } catch (err) {
      setReply("Gagal terhubung ke server.");
    }
  };

  if (!mounted) return null;

  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",     // Tengah secara horizontal
      justifyContent: "center",    // Tengah secara vertikal
      minHeight: "100vh",          // Tinggi layar penuh
      backgroundColor: "#ffffff28",
      fontFamily: "Arial, sans-serif",
      padding: "10px"
    }}>
      <h1 style={{
        fontSize: "48px",
        fontWeight: "bold",
        color: "#ffffff"
      }}>
        Bukan 110
      </h1>
      <h5 style={{
        fontSize: "15px",
        marginBottom: "50px",
        fontWeight: "normal",
        color: "#ffffff"
      }}>
        Hanya AI Assistant
      </h5>

      {/* Kotak Input */}
      <div style={{
        width: "100%",
        maxWidth: "584px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Tanyakan sesuatu..."
          style={{
            width: "100%",
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "0px solid rgb(0, 0, 0)",
            outline: "none",
            boxShadow: "1px 1px 5px 5px rgba(255, 255, 255, 0.28)",
            marginBottom: "30px"
          }}
          onKeyDown={(e) => e.key === 'Enter' && send()} // tekan Enter untuk kirim
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={send} style={buttonStyle}>
            Klik Jawaban <br></br>
            <span style={{ fontSize: "12px", fontStyle: "italic" }}>(Dengan Delay {`<`} 10 Detik)</span>
          </button>
        </div>
      </div>

      {/* Area Balasan */}
      {reply && (
        <div style={{
          marginTop: "40px",
          maxWidth: "584px",
          textAlign: "justify",
          color: "#cccccc",
          lineHeight: "1.4"
        }}>
          <p style={{ fontWeight: "bold" }}>Hasil Pencarian AI:</p>
          <div className="prose"><ReactMarkdown>{reply}</ReactMarkdown></div>
        </div>
      )}

    </main>
  );
}

// Objek gaya untuk tombol
const buttonStyle = {
  padding: "5px 50px",
  //backgroundColor: "rgb(0, 0, 0)",
  //border: "2px solid #ffffff",
  borderRadius: "10px",
  boxShadow: "1px 1px 5px 5px rgba(255, 255, 255, 0.28)",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "border 0.2s"
};