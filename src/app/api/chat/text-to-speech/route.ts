import { ElevenLabsClient } from "elevenlabs";

const eleven_labs_key = "12f8c871866183b867e62a0eb9b69465";

export async function POST(req: Request) {
    const { message, voice } = await req.json();
  
    const elevenlabs = new ElevenLabsClient({
      apiKey: eleven_labs_key
    });
  
    try {
      const audio = await elevenlabs.generate({
        voice,
        model_id: "eleven_turbo_v2",
        voice_settings: { similarity_boost: 0.5, stability: 0.5 },
        text: message
      });
  
      return new Response(audio as any, {
        headers: { "Content-Type": "audio/mpeg" }
      });
    } catch (error: any) {
      console.error(error);
      return Response.json(error, { status: error.statusCode });
    }
  }