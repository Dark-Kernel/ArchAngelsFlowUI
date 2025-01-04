import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

const LoadingDots = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
  </div>
);

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: 'This is a simulated AI response. Replace this with actual API integration.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';
    return (
      <div className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full bg-slate-700 p-2">
            {isUser ? 
              <User className="w-full h-full text-white" /> : 
              <Bot className="w-full h-full text-blue-400" />
            }
          </div>
        </div>
        <div className={`chat-bubble ${
          isUser ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-200'
        }`}>
          {message.content}
        </div>
        <div className="chat-footer opacity-50 text-xs">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-violet-950 text-white font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Chat Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            AI Chat Assistant
          </h1>
          <p className="text-slate-300 mt-2">
            Ask anything about your social media performance
          </p>
        </div>

        {/* Chat Messages Container */}
        <div className="bg-white/5 rounded-lg shadow-xl mb-4 p-4 min-h-[60vh] max-h-[60vh] overflow-y-auto backdrop-blur-sm">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500">
              <p>Start a conversation by sending a message below</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-center py-4">
                  <LoadingDots />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full input input-lg bg-white/5 backdrop-blur-sm border-white/20 pr-16 focus:border-white/50 focus:ring-2 focus:ring-white/20 placeholder-white/50"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-blue-400 hover:bg-blue-900/50"
          >
            <Send className={`h-6 w-6 ${isLoading ? 'opacity-50' : ''}`} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
