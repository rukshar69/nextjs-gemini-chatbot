"use client";

import Image from "next/image";
import Chat from "./components/Chat";

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-[#E7EBEF] text-white">
      <nav className="flex justify-center items-center p-4 bg-[#6580B8] text-white">
        <h1 className="text-xl font-semibold">
          Talk to <span className="highlighted-text">Story Teller!!!</span>
        </h1>
      </nav>
      <div className="flex-grow overflow-hidden">
        <Chat />
      </div>
    </main>
  );
}
