import React, { useContext, useState } from "react";
import ChatWindow from "./ChatWindow";
import { AppContext, AppProvider } from "../context/Context";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const {login}=useContext(AppProvider)

  return (
    <>{login && 
          <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-5 right-5 z-50
          w-18 h-18 rounded-full
          bg-gradient-to-br from-green-500 to-green-700
          text-white text-2xl
          shadow-xl
          hover:scale-105 active:scale-95
          transition-transform
          animate-pulse
        "
      >
        🤖
      </button>

      {/* Chat Window */}
      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
    }</>

  );
};

export default FloatingChatbot;
