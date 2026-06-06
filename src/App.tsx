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

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderView = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'curriculum': return <Curriculum />;
      case 'projects': return <Projects />;
      case 'mentorship': return <Mentorship />;
      case 'career': return <Career />;
      default: return <Dashboard />;
    }
  }

  return (
    <DataProvider>
      <div className="flex h-screen bg-[#0F1117] overflow-hidden text-slate-200 font-sans selection:bg-sky-500/30 selection:text-white">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 scroll-smooth">
            <div className="mx-auto max-w-7xl">
              {renderView()}
            </div>
          </main>
          <AiMentorModal />
        </div>
      </div>
    </DataProvider>
  );
}
