import { Bell, Search } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function TopBar() {
  const { openAiChat } = useData();

  return (
    <header className="h-16 bg-[#0F1117] border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-[#161B22] placeholder-slate-500 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm transition-all"
            placeholder="Search lessons, mentors, jobs..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-slate-500 hover:text-slate-300 transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform -translate-y-1/2 translate-x-1/2 flex items-center justify-center ring-2 ring-[#0F1117]"></span>
        </button>
        <div className="h-8 w-px bg-slate-800 mx-2"></div>
        <button 
          onClick={() => openAiChat('You are DevForge AI, a senior technical mentor and expert developer. You are helping a student in a coding bootcamp. Be encouraging, concise, and provide code examples when helpful.')}
          className="bg-sky-500 text-slate-900 font-bold px-4 py-2 text-sm rounded-lg hover:bg-sky-400 transition shadow-lg shadow-sky-500/10"
        >
          Ask AI Mentor
        </button>
      </div>
    </header>
  );
}
