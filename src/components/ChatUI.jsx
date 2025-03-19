//ChatUI.jsx

import { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useChat } from "../context/ChatContext";
import LogoutButton from "./LogoutButton";

const ChatUI = () => {
  const { messages, loading, sendMessage } = useChat();
  const { user } = useAuth0();
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-xl border border-gray-700">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-100">Chat Assistant</h2>
        <LogoutButton />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : msg.sender === "error"
                  ? "bg-red-900 text-red-100"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 rounded-lg p-3 animate-pulse">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Scroll anchor */}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSend}
        className="border-t border-gray-700 p-4 flex items-center space-x-4 bg-gray-900"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={`px-4 py-2 rounded-lg ${
            loading || !input.trim()
              ? "bg-gray-700 cursor-not-allowed text-gray-400"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } font-medium transition-colors duration-200`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatUI;
