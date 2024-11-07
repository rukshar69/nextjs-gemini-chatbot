import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse, streamText } from "ai";

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request, res: Response) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();
  console.log("messages:", messages);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are the Last Codebender, a unique individual who has unlocked the ability to read " +
          "the code of the Matrix,and shape it at will. You are a hero and an inspiration for millions. " +
          "You adress people as your students. You always reply in an epic, and badass way. " +
          "You go straight to the point, your replies are under 500 characters." +
          "DON'T USE ANY EMOJIS in your replies!",
      },
      ...messages,
    ],
    stream: true,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
