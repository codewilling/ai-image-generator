"use client";

import { Suspense, useState } from "react";

export default function Home() {
  const [generatedImage, setGeneratedImage] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  async function generateImage() {
    if (prompt.length === 0) return;
    //fetch with body set to prompt
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //JSON.stringify takes an object or array
      body: JSON.stringify({ prompt }),
    });
    //instance json method (no parameters) to return an object of data
    const { data } = await response.json();
    if (data.error) {
      window.alert("Error: " + data.error + " " + data.message);
      return;
    }

    // API returns an array of images.
    // As we just generate 1 image, then get the URI of the first image
    const uri = data.images[0].uri;
    setGeneratedImage(uri);
  }
  return (
    <div className="bg-black mt-10 flex items-center justify-center">
      <main className=" max-w-xl mx-auto">
        <h1 className="flex justify-center text-white text-3xl font-bold mb-8">
          Generate your AI Image
        </h1>

        <section className="max-w-full">
          <div className="flex justify-center">
            <input
              type="text"
              id="prompt"
              name="prompt"
              className="rounded-l-lg py-3 px-4 text-slate-900 focus:outline-none"
              placeholder="Enter your prompt here"
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
            />

            <button
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 rounded-r-lg py-3 px-4 ml-1 font-semibold"
              onClick={() => generateImage()}
            >
              Generate
            </button>
          </div>
        </section>
        {generatedImage ? (
          <div className="flex items-center justify-center">
            <img
              src={generatedImage}
              alt="Generated Image"
              className="m-2 w-2/3 rounded-lg hover:scale-105 duration-300"
            />
          </div>
        ) : (
          <section className="mt-8 max-w-full">
            <div className="flex items-center justify-center border-2 border-dashed border-gray-500 rounded-md w-full p-10">
              <div className="text-md text-gray-600">
                Image will be generated here!
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
