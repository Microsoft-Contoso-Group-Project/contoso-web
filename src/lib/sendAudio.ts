// const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/openai/whisper-large-v3";
// const HF_api_key = process.env.HUGGING_FACE_API_KE!;
// import path from 'path';
// import fs from 'fs';
// import { ChatTurn, GroundedMessage } from "./types";


export const sendAudio = async (audioBlob: Blob) : Promise<string>=> {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');
   
    const response = await fetch("/api/chat/whisper", {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const text_result = await response.json();
    console.log('Transcription:', text_result);
    return text_result.text;

  };