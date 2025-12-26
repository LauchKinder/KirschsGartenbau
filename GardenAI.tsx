
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, ShieldCheck } from 'lucide-react';
import { ChatMessage } from '../types';

const GardenAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Guten Tag! Ich bin der digitale Assistent von Kirschs Gartenbau. Wie kann ich Ihnen heute bei Ihrem Gartenprojekt behilflich sein?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // SICHERER CALL: Wir rufen unsere eigene API-Route auf statt das SDK im Browser zu nutzen
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('Proxy error');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      let currentText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          currentText += chunk;
          
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1].text = currentText;
            return updated;
          });
        }
      }
    } catch (error) {
      console.error('AI-System-Status:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Der Assistent ist momentan im Wartungsmodus. Bitte nutzen Sie unser Kontaktformular oder rufen Sie uns direkt an.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-sans">
      {isOpen ? (
        <div className="bg-white rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.18)] w-80 md:w-[420px] overflow-hidden flex flex-col border border-slate-100 animate-in zoom-in duration-300 origin-bottom-right h-[620px]">
          <div className="bg-slate-900 px-6 py-5 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-700 rounded-xl shadow-lg border border-green-500/20">
                <Bot className="h-5 w-5 text-green-200" />
              </div>
              <div>
                <p className="font-bold text-sm tracking-tight">Garten-Experte AI</p>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black">Server-Proxy Aktiv</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex gap-3 max-w-[88%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm ${m.role === 'user' ? 'bg-slate-800 text-white' : 'bg-white text-green-700 border border-green-50'}`}>
                    {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-green-700 text-white rounded-tr-none font-medium' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/60'
                  }`}>
                    {m.text || (isLoading && i === messages.length - 1 ? '...' : '')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-white border-t border-slate-100 shrink-0">
            <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Wie können wir helfen?"
                className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all shadow-inner"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-slate-900 text-white rounded-xl hover:bg-green-700 transition-all shadow-md disabled:opacity-20"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-[0.1em]">
              <ShieldCheck className="h-3 w-3 text-green-600" />
              <span>Sichere Proxy-Verbindung • DSGVO-Konform</span>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white p-5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:bg-green-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 group border-4 border-white"
        >
          <div className="relative">
             <MessageSquare className="h-6 w-6 relative z-10" />
             <div className="absolute inset-0 bg-green-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-sm tracking-tight pr-0 group-hover:pr-2">
            Garten-Assistent
          </span>
        </button>
      )}
    </div>
  );
};

export default GardenAI;
