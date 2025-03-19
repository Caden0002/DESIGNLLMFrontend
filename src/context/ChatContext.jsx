//ChatContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth0();

  const fetchChatHistory = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/chat/history?userId=${user.sub}`
      );
      const data = await response.json();
      const formattedHistory = data
        .reverse()
        .map((chat) => [
          { sender: "user", text: chat.userMessage },
          { sender: "bot", text: chat.botResponse },
        ])
        .flat();
      setMessages(formattedHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const sendMessage = async (message) => {
    if (!user) return;

    try {
      setLoading(true);
      // Add user message immediately
      const userMessage = { sender: "user", text: message };
      setMessages((prev) => [...prev, userMessage]);

      // Send message to backend with user information
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          userId: user.sub,
          userName: user.name,
        }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "error",
          text: "Sorry, I had trouble processing your message.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch chat history when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchChatHistory();
    }
  }, [user]);

  const value = {
    messages,
    loading,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
