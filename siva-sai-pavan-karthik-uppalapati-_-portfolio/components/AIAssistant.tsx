import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Chat } from '@google/genai';
import { ChatMessage } from '../types';
import { createChat } from '../services/geminiService';
import { ChatBubbleIcon, CloseIcon, SendIcon } from './IconComponents';

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5 p-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
);

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      chatRef.current = createChat();
      setMessages([
        { id: 'initial-ai-message', text: "Hi there! I'm Siva's AI assistant. Feel free to ask me anything about his skills, experience, or projects.", sender: 'ai' }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading || !chatRef.current) return;
  
    const userMessage: ChatMessage = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
  
    try {
      const stream = await chatRef.current.sendMessageStream({ message: input });
      let aiResponseText = '';
      let aiMessageId = `ai-${Date.now()}`;
  
      // Add a placeholder for the AI message
      setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai' }]);
  
      for await (const chunk of stream) {
        aiResponseText += chunk.text;
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, text: aiResponseText } : msg
        ));
      }
    } catch (e) {
      console.error("Gemini API error:", e);
      setError("Sorry, I'm having a little trouble connecting. Please try again later.");
      // Add error message to chat
      setMessages(prev => [...prev, { id: `err-${Date.now()}`, text: "Sorry, I'm having a little trouble connecting. Please try again later.", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-red-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300 z-50"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <CloseIcon className="w-8 h-8" /> : <ChatBubbleIcon className="w-8 h-8" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-gray-950/80 backdrop-blur-md rounded-lg shadow-2xl flex flex-col z-50 border border-gray-700/50 overflow-hidden">
          <header className="bg-black/30 p-4 flex justify-between items-center border-b border-gray-800/80">
            <h3 className="text-lg font-bold text-gray-100">AI Assistant</h3>
            <p className="text-xs text-red-500">Powered by Gemini</p>
          </header>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-200 shadow-sm'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-gray-800 rounded-lg shadow-sm">
                        <TypingIndicator />
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {error && <p className="p-4 text-sm text-red-600 border-t border-gray-800">{error}</p>}

          <div className="p-2 border-t border-gray-800/80 bg-black/30">
            <div className="flex items-center bg-gray-800/80 rounded-lg">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about my experience..."
                className="flex-1 bg-transparent p-3 text-gray-200 placeholder-gray-500 focus:outline-none"
                disabled={isLoading}
              />
              <button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="p-3 text-gray-400 hover:text-red-500 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors">
                <SendIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;