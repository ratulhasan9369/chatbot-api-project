"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import TypingAnimation from "@/components/typingAnimation";
import OpenAI from "openai";

export default function Home() {
  const [inputValue, setInputValue] = useState ('');
  const [chatLog, setChatLog] = useState ([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, {type: 'user', message: inputValue}])
    sendMessage(inputValue);
    
    setInputValue('');
  }
  const apiKey = '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';
  const sendMessage = (message) =>{
    // const apiKey = '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';
    const url = 'https://api.openai.com/v1/completions';

    const headers = {
      'Content-type':'application/json',
      // 'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
      'Authorization':`Bearer ${apiKey}`
    };

    const data = {
      model: "gpt-3.5-turbo-1106",
      // model: "gpt-3.5-turbo",
      // model: "gpt-3.5-turbo-0301",
      messages: [{"role":"user", "content":message}]
    };

    setIsLoading(true);

    axios.post(url, data, {headers:headers}).then((response) => {
      console.log(response);
      setChatLog((prevChatLog) =>[...prevChatLog, {type: 'bot', message: response.data.choices[0].message.content}])
      setIsLoading(false);

    }).catch((error) =>{
      setIsLoading(false);
      console.log(error);
    })

  }

  return (

      // <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="container mx-auto max-w-[700px]">
      {/* </main><main className="flex min-h-screen flex-col items-center justify-between p-24" style={{backgroundColor: '#ff0000'}}> */}

      <div className="flex flex-col min-h-screen bg-gray-900">
      <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-3xl" >Chat SOMYKORON</h1>
      <div className="flex-grow p-6">
      <div className="flex flex-col space-y-4">
         
      {
        chatLog.map((message, index) => (
          <div key={index} className={`flex ${message.type==='user' ? 'justify-end':'justify-start'}`}>
            <div className={`${message.type==='user'? 'bg-purple-500':'bg-gray-800'} rounded-lg p-4 text-white max-w-sm`}>
            {message.message}
            </div>
            </div>
        ))
      }
      {
        isLoading &&
        <div key={chatLog.length} className="flex justify-start">
          <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
            <TypingAnimation/>

          </div>
        </div>
      }
      </div>
      </div>
    
      <form onSubmit={handleSubmit} className="flex-none p-6">
        <div className="flex rounded-lg border border-gray-700 bg-gray-800">
          <input type="text" className="flex-grow px-4 py-4 bg-transparent text-white focus:outline-none" placeholder="Type your massage..." value={inputValue} onChange={(e)=> setInputValue(e.target.value)} style={{backgroundColor: '#221E1E'}} />
          <button type="submit" className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300">Send</button>
        </div>
      </form>
      </div>
    </div>

    // </div>
  );
}
