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
          "Kamu adalah asisten layanan kepolisian Indonesia. Jawab jelas dan formal. nomor telepon yang terkait dengan kepolisian adalah hanya 110",
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