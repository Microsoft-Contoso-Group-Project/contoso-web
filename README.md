This is the Contoso Outdoors Company Website used for demonstration of the Rebuilding Contoso Chat Project - a collaboration between Imperial College's EEE Department and Microsoft. It uses assets created by DALLE-3 and GPT-4. It is built with Next.js and Tailwind CSS. 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

If you open [http://localhost:3000](http://localhost:3000) with your browser you should get the following result:

![Contoso Outdoors Home Page](images/contosoweb.png "Contoso Outdoors Home Page")

Click on the chat button indicated above to start a chat session. There are three different chat types you can try:

- Regular Chat using prompt flow (you can set that up using the  [Contoso Chat](https://github.com/Azure-Samples/contoso-chat/) repo). This is the default chat type.
- Grounded chat using the "Add Your Data" feature inside of the Azure AI Studio playground (if you follow the instructions in the [Contoso Chat](https://github.com/Azure-Samples/contoso-chat/) repo, you will have this set up already). This can be enabled by adding `?type=grounded` to the URL. For example, `http://localhost:3000/?type=grounded`
- Visual Chat - this is the same UI that was shown at the Microsoft Ignite conference. This can use either video capture or an image upload. This can be enabled by adding `?type=visual` to the URL. For example, `http://localhost:3000/?type=visual`. If you want to use video capture, you can use `?type=video` instead. For example, `http://localhost:3000/?type=video`. (Instructions for how to set this prompt flow up are forthcoming as soon as GPT-4 Turbo with Vision is released).

## Setting up Endpoints

In order to use the Contoso Outdoors website, you will need to set up the following endpoints in a `.env` file in the root of the project:

```bash
CONTOSO_SEARCH_ENDPOINT=<YOUR_SEARCH_ENDPOINT>
CONTOSO_SEARCH_KEY=<YOUR_SEARCH_KEY>
CONTOSO_AISERVICES_ENDPOINT=<YOUR_AI_SERVICES_ENDPOINT>
CONTOSO_AISERVICES_KEY=<YOUR_AI_SERVICES_KEY>
PROMPTFLOW_ENDPOINT=<YOUR_PROMPTFLOW_ENDPOINT>
PROMPTFLOW_KEY=<YOUR_PROMPTFLOW_KEY>
VISUAL_ENDPOINT=<YOUR_PROMPTFLOW_VISUAL_ENDPOINT>
VISUAL_KEY=<YOUR_PROMPTFLOW_VISUAL_KEY>
```

If you follow the [Contoso Chat](https://github.com/Azure-Samples/contoso-chat/) repo, you will have all of these endpoints set up already. If you want to use the Visual Chat feature, you will need to wait until GPT-4 Turbo with Vision is released.

## Additional Features
As part of this site we have added debug statements to the console to see the responses. For the grounded chat, you will see the following:

![Grounded Chat Debug](images/grounded.png "Grounded Chat Debug")

For the standard prompt flow chat you will see the following:

![Prompt Flow Chat Debug](images/promptflow.png "Prompt Flow Chat Debug")

This is useful for debugging purposes and shows you what is being sent to the individual endpoints.

## Change Log
This website was originally pulled from the contoso-web repository from Microsoft Azure Samples. Our team introduced two features to this set up:
- Audio input for prompt. Users can use their in-device microphone and verbally convey their prompt. This audio recording will be sent to Whisper model for text transcription purposes via Hugging Face's serverless API. The generated text will then be sent to the back-end for inference.
- Audio output of response. Once the text response is returned from the chat completion model in the back-end, the text will be sent to a text-to-speech model on 11Labs via the 11Labs API, which will read the text out into an audio file. The audio file is sent back to the chat interface and played automatically for the user.
