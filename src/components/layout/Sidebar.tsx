import { NAV_ITEMS } from "../../data/mockData";
import { useData } from "../../context/DataContext";
import { cn } from "../../lib/utils";
import { Terminal } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { userData } = useData();

  return (
    <div className="w-64 bg-[#161B22] border-r border-slate-800 text-slate-300 flex flex-col hidden md:flex flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0 mb-4">
        <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-bold text-slate-900 mr-2 border border-sky-400/50 shadow-sm shadow-sky-500/20">λ</div>
        <span className="font-bold text-xl tracking-tight text-slate-100">DEV_FORGE</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-2 px-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                  isActive
                    ? "bg-sky-500/10 text-sky-400"
                    : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                <Icon size={20} className={cn("mr-3", isActive ? "text-sky-400" : "text-slate-500")} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition cursor-pointer">
          <img src={userData.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full border border-slate-600" referrerPolicy="no-referrer" />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-slate-200 truncate">{userData.name}</span>
            <span className="text-xs text-slate-500 truncate mt-0.5">Settings...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
