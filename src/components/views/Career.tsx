import { useData } from '../../context/DataContext';
import { Briefcase, MapPin, Building, ArrowUpRight, FileCheck } from 'lucide-react';

export default function Career() {
  const { jobs: JOBS, openAiChat } = useData();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Career Services</h2>
          <p className="text-slate-400 mt-2">Curated job matches, resume review, and interview prep.</p>
        </div>
        <button className="bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2">
          <FileCheck size={18} />
          Submit Resume Review
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Job Board */}
        <div className="flex-1 space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-4 text-white">
            <Briefcase size={20} className="text-sky-500" />
            Top AI/ML Matches For You
          </h3>
          
          {JOBS.map((job) => (
            <div key={job.id} className="bg-[#161B22] border border-slate-800 rounded-xl p-5 hover:border-sky-500/50 hover:shadow-md hover:shadow-sky-500/5 transition-all cursor-pointer group">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">{job.title}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5"><Building size={16} className="text-slate-500"/> {job.company}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-500"/> {job.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 rounded-full border border-emerald-500/20 shrink-0">
                    <span className="text-emerald-400 font-bold text-sm">{job.match}%</span>
                  </div>
                  <button className="hidden sm:inline-flex items-center text-sm font-bold text-sky-400 hover:text-sky-300">
                    Apply <ArrowUpRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
                 <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-md font-medium border border-slate-700">{job.type}</span>
                 <span className="px-2.5 py-1 bg-sky-500/10 text-sky-400 text-xs rounded-md font-medium border border-sky-500/20">Fast Apply</span>
              </div>
            </div>
          ))}
        </div>

        {/* Career Side Panel */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 text-white shadow-md border-t border-slate-700">
            <h3 className="font-bold text-lg mb-2 text-white">Mock Interviews</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Practice your technical and behavioral skills with our AI-powered interview simulator.
            </p>
            <button 
              onClick={() => openAiChat('You are a technical hiring manager at a top tech company. You are conducting a mock behavioral and technical interview. Introduce yourself, then ask the candidate to tell you about themselves or pick a technical topic like React, Algorithms, or System Design. Keep your responses conversational, ask probing follow-up questions, and provide constructive feedback if they ask for it.')}
              className="w-full bg-sky-500 text-slate-900 font-bold py-2.5 rounded-lg text-sm hover:bg-sky-400 transition shadow-sm shadow-sky-500/20"
            >
              Start Simulation
            </button>
          </div>

          <div className="bg-[#161B22] border border-slate-800 rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold text-lg mb-4 text-white">Career Resources</h3>
             <ul className="space-y-3">
               <li>
                 <a href="#" className="text-sky-400 hover:text-sky-300 text-sm font-bold flex items-center justify-between group">
                   ML Engineer Resume Template <ArrowUpRight size={14} className="text-slate-500 group-hover:text-sky-300 transition-colors"/>
                 </a>
               </li>
               <li>
                 <a href="#" className="text-sky-400 hover:text-sky-300 text-sm font-bold flex items-center justify-between group">
                   Negotiating Startup Equity <ArrowUpRight size={14} className="text-slate-500 group-hover:text-sky-300 transition-colors"/>
                 </a>
               </li>
               <li>
                 <a href="#" className="text-sky-400 hover:text-sky-300 text-sm font-bold flex items-center justify-between group">
                   System Design Cheat Sheet <ArrowUpRight size={14} className="text-slate-500 group-hover:text-sky-300 transition-colors"/>
                 </a>
               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
