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
    //return Response.json(data);
  //   res.status(200).json(responseData);
  // } catch (error) {
  //   console.error('Failed to send audio to Whisper model:', error);
  //   res.status(500).json({ error: 'Failed to fetch data from Hugging Face API' });
  // }
  return Response.json(responseData);
}

//new version
// import fs from 'fs';
// import path from 'path';
// import { createEdgeRouter } from 'next-connect';
// import { NextResponse } from "next/server";
// import type { NextRequest, NextFetchEvent } from "next/server";
// import multer from 'multer';

// // Configure multer
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       const uploadPath = path.join(process.cwd(), 'uploads');
//       // Ensure the uploads directory exists
//       fs.mkdirSync(uploadPath, { recursive: true });
//       cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   }),
// });

// const apiRoute = createEdgeRouter<NextRequest, NextFetchEvent>();

// apiRoute.use(upload.single('file'));

// apiRoute.post((req, res) => {
//   res.status(200).json({ message: 'File uploaded successfully', file: req.file });
// });

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };