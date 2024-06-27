import type { NextApiRequest, NextApiResponse } from 'next';
interface ExtendedRequestInit extends RequestInit {
  duplex?: 'half';
}
import { NextRequest, NextResponse } from "next/server";
//import fetch from 'isomorphic-unfetch';
import formidable from 'formidable';
// import formidable, { IncomingForm, File } from 'formidable';


const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/openai/whisper-large-v3";
const HF_api_key = process.env.HUGGING_FACE_API_KEY!;

export const config = {
  api: {
    bodyParser: false,
  },
};


export async function POST(req: NextRequest, res: NextApiResponse) {
    
  if (!process.env.HUGGING_FACE_API_KEY) {
    res.status(500).json({ error: 'Hugging Face API key not set' });
    return;
  }

  const formData = await req.formData();
  const file = formData.get("file") as Blob;
  const buffer = Buffer.from(await file.arrayBuffer());

    const response = await fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        'Authorization': "Bearer " + HF_api_key,
        //'Content-Type': "application/octet-stream", //to send a binary file
      },
      body: buffer,
      duplex: 'half',
    } as ExtendedRequestInit);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
  return Response.json(responseData);
}
