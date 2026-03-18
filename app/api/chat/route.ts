import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    // 1. Tentukan jalur ke file referensi
    const filePath = path.join(process.cwd(), "data", "referensi.txt");
    // 2. Baca isi filenya sebagai teks (string)
    const referensiKonten = fs.readFileSync(filePath, "utf8");
    // 3. Masukkan isi file ke dalam prompt system
    const res = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: `Berikut adalah basis pengetahuan (knowledge base) dalam format Markdown.
          Jawablah pertanyaan hanya berdasarkan data ini:
          
          ${referensiKonten}
          
          Jika jawaban tidak ada di referensi, arahkan ke kantor polisi terdekat.`
        },
        {
          role: "user",
          content: message,
        },
      ],
    });


    return Response.json({
      reply: res.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Gagal memproses pesan" }, { status: 500 });
  }
}
