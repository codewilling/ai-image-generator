import {Leap } from '@leap-ai/sdk'
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  //static json method(requires at least a body parameter) to return a response body and headers
  return NextResponse.json({ greeting: "Hello, from Next.js" });
}

export async function POST(request: Request) {
  //instance json method (no parameters) to return an object of data
  const res = await request.json();
  //res has prompt object because in JSON.stringify you passed in {prompt: prompt}
  const prompt = res.prompt;

  const apiKey = process.env.LEAP_API_KEY as string

  if(!prompt || prompt.length ===0){
    return NextResponse.json({error: "no prompt recieved"}, {status: 400})
  }
  if(!apiKey){
    return NextResponse.json({error: "no api key recieved"}, {status: 400})
  }

  const MODEL_ID = "7575ea52-3d4f-400f-9ded-09f7b1b1a5b8"; // Model: OpenJourney v1
  const IMAGE_WIDTH = 512;
  const IMAGE_HEIGHT = 512;
  const NUMBER_OF_IMAGES = 1;

  const leap = new Leap(apiKey);
  const {data, error} = await leap.generate.generateImage({
    modelId: MODEL_ID,
    prompt: `${prompt} mdjrny-v4 style`,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    numberOfImages: NUMBER_OF_IMAGES,
  })

  if(error){
    return NextResponse.json({error},{status: 500})
  }
//   console.log("Prompt: ", prompt)
  return NextResponse.json({data}, {status: 200})
}
