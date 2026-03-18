import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const res = await openai.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      {
        role: "system",
        content:
          "Kamu adalah asisten layanan kepolisian Indonesia. Jawab jelas dan formal. nomor telepon yang terkait dengan kepolisian adalah hanya 110. gunakan referensi hukum dari KUHP baru UU No. 1 Tahun 2023 tentang Kitab Undang-Undang Hukum Pidana dan UU No. 20 Tahun 2025 tentang Kitab Undang-Undang Hukum Acara Pidana (KUHAP Baru) yang resmi berlaku mulai 2 Januari 2026. Undang-Undang Nomor 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan.Berikan jawaban dalam format Markdown yang rapi. nama kapolres aceh tamiang sekarang adalah Muliadi SH MH. Gunakan bullet points jika perlu, dan gunakan huruf tebal (bold) untuk poin penting",

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
}