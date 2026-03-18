import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getAllReferences() {
  const dataPath = path.join(process.cwd(), "data");
  const filenames = fs.readdirSync(dataPath);

  // Ambil isi semua file .md atau .txt dan gabungkan jadi satu teks besar
  const allContent = filenames
    .filter(file => file.endsWith(".md") || file.endsWith(".txt"))
    .map(file => {
      const content = fs.readFileSync(path.join(dataPath, file), "utf8");
      //  return `--- SUMBER: ${file} ---\n${content}\n`;
      return content;
    })
    .join("\n");

  return allContent;
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    // 1. Tentukan jalur ke file referensi
    //const filePath = path.join(process.cwd(), "data", "referensi.txt");
    // 2. Baca isi filenya sebagai teks (string)
    //const referensiKonten = fs.readFileSync(filePath, "utf8");
    const referensiKonten = getAllReferences();
    // 3. Masukkan isi file ke dalam prompt system
    const res = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: `Kamu adalah asisten Bukan 110 Polri. 
          Gunakan referensi berikut untuk menjawab pertanyaan user:
          
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
