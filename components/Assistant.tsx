
import React, { useState, useRef, useEffect } from 'react';
import { streamChatResponse } from '../services/geminiService.ts';
import { Message } from '../types.ts';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy tu Compañero Nazareno. ¿En qué puedo apoyarte espiritualmente hoy? ¿Deseas una oración, un versículo o simplemente conversar?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const historyForGemini = messages.concat(userMessage).map(m => ({
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: m.content }]
    }));

    let currentResponse = '';
    const placeholderMessage: Message = { role: 'assistant', content: '', timestamp: new Date() };
    setMessages(prev => [...prev, placeholderMessage]);

    try {
      await streamChatResponse(historyForGemini, (chunk) => {
        currentResponse += chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], content: currentResponse };
          return updated;
        });
      });
    } catch (error) {
      console.error(error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], content: 'Lo siento, hubo un problema al conectarme. Por favor intenta de nuevo.' };
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-[calc(100vh-160px)] md:h-[calc(100vh-120px)] flex flex-col bg-[#0c1a36]/50 rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden shadow-2xl m-4 backdrop-blur-sm">
      <div className="p-4 bg-white/5 border-b border-white/10 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.3)]">
          <i className="fas fa-dove text-[#071025]"></i>
        </div>
        <div>
          <h2 className="font-bold">Compañero Nazareno</h2>
          <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold">En Línea para Tí</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-yellow-400 text-[#071025] rounded-tr-none font-medium' 
                : 'bg-white/10 text-white rounded-tl-none border border-white/5'
            }`}>
              {msg.content || <div className="flex gap-1 py-1"><div className="w-2 h-2 rounded-full bg-white/30 animate-bounce"></div><div className="w-2 h-2 rounded-full bg-white/30 animate-bounce delay-75"></div><div className="w-2 h-2 rounded-full bg-white/30 animate-bounce delay-150"></div></div>}
              <div className={`text-[10px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-black' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu mensaje o petición de oración..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={isTyping}
          className="w-12 h-12 bg-yellow-400 text-[#071025] rounded-xl flex items-center justify-center hover:bg-yellow-300 transition-all active:scale-95 disabled:opacity-50"
        >
          <i className={`fas ${isTyping ? 'fa-circle-notch fa-spin' : 'fa-paper-plane'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default Assistant;
