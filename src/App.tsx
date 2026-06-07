import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import Dashboard from './components/views/Dashboard';
import Curriculum from './components/views/Curriculum';
import Projects from './components/views/Projects';
import Mentorship from './components/views/Mentorship';
import Career from './components/views/Career';
import AiMentorModal from './components/views/AiMentorModal';
import { DataProvider } from './context/DataContext';
import { NAV_ITEMS } from './data/mockData';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderView = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} />;
      case 'curriculum': return <Curriculum />;
      case 'projects': return <Projects />;
      case 'mentorship': return <Mentorship />;
      case 'career': return <Career />;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  }

  return (
    <DataProvider>
      <div className="flex h-screen bg-[#0F1117] overflow-hidden text-slate-200 font-sans selection:bg-sky-500/30 selection:text-white">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-4 pb-24 sm:p-8 md:p-10 md:pb-10 scroll-smooth">
            <div className="mx-auto max-w-7xl">
              {renderView()}
            </div>
          </main>
          <nav className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-[#161B22]/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="grid grid-cols-5 gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[10px] font-semibold transition",
                      isActive
                        ? "bg-sky-500/15 text-sky-300"
                        : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={19} />
                    <span className="max-w-full truncate">
                      {item.shortLabel ?? item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
          <AiMentorModal />
        </div>
      </div>
    </DataProvider>
  );
}
