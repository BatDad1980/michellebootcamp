import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AiMentorModal() {
  const { isAiChatOpen, closeAiChat, aiChatPrompt } = useData();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session when modal opens
  useEffect(() => {
    if (isAiChatOpen) {
      // Create fresh chat when opened, if we don't have one or want to reset
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: aiChatPrompt,
          }
        });
        
        // Initial greeting
        setMessages([{
          role: 'model',
          text: aiChatPrompt.includes('interview') 
            ? "Hello! I'm your AI Interviewer. Are you ready to begin your mock technical interview?"
            : "Hello! I'm your DevForge AI Mentor. How can I help you with your coding journey today?"
        }]);
      } catch (err) {
        console.error("Failed to initialize AI Chat:", err);
        setMessages([{ role: 'model', text: 'Sorry, the AI service is currently unavailable. Please check your API key setup.' }]);
      }
    } else {
       // Clean up when closed
       chatSessionRef.current = null;
    }
  }, [isAiChatOpen, aiChatPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatSessionRef.current.sendMessage({ message: userMessage });
      const responseText = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages(prev => [...prev, { role: 'model', text: "**Error**: Unable to reach the AI server right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAiChatOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0F1117]/80 backdrop-blur-sm" 
        onClick={closeAiChat}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#161B22] border border-slate-700/50 shadow-2xl shadow-sky-500/10 rounded-2xl overflow-hidden flex flex-col h-[600px] max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#161B22]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500/10 rounded-full flex items-center justify-center border border-sky-500/20 text-sky-400 shrink-0">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white tracking-tight">Ask AI Mentor</h3>
              <p className="text-xs text-slate-400 font-medium">Powered by Gemini AI</p>
            </div>
          </div>
          <button 
            onClick={closeAiChat}
            className="text-slate-500 hover:text-slate-300 hover:bg-slate-800 p-2 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0F1117]/50 scroll-smooth">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex gap-4 items-center justify-center shrink-0 border mt-1 ${
                msg.role === 'user' 
                  ? 'bg-slate-800 border-slate-700 text-slate-300' 
                  : 'bg-sky-500/10 border-sky-500/20 text-sky-400'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm ${
                msg.role === 'user' 
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20 rounded-tr-sm' 
                  : 'bg-[#161B22] border border-slate-800 text-slate-200 shadow-sm rounded-tl-sm'
              }`}>
                {/* Normally we'd use react-markdown here, keeping it simple for now or split by newlines */}
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border mt-1 bg-sky-500/10 border-sky-500/20 text-sky-400">
                  <Bot size={16} />
               </div>
               <div className="bg-[#161B22] border border-slate-800 text-slate-400 shadow-sm rounded-2xl rounded-tl-sm px-5 py-4 text-sm">
                  <Loader2 size={18} className="animate-spin" />
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#161B22] border-t border-slate-800">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-end gap-2 relative"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything..."
              className="w-full bg-[#0F1117] border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 resize-none min-h-[52px] max-h-[150px]"
              rows={1}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:hover:bg-sky-500 text-slate-900 h-[52px] w-[52px] rounded-xl flex items-center justify-center transition shadow-sm shrink-0"
            >
              <Send size={20} className="ml-1" />
            </button>
          </form>
          <div className="text-center mt-3">
             <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">AI Mentor can make mistakes. Verify code snippets.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
