import { useData } from '../../context/DataContext';
import { Calendar, Video, MessageSquare } from 'lucide-react';

export default function Mentorship() {
  const { mentors: MENTORS, openAiChat } = useData();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-5xl">
       <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Mentorship Program</h2>
        <p className="text-slate-400 mt-2">Connect with industry experts for code reviews, career advice, and technical deep-dives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MENTORS.map((mentor) => (
          <div key={mentor.id} className="bg-[#161B22] border border-slate-800 shadow-sm rounded-2xl overflow-hidden flex flex-col">
            <div className="p-6 text-center border-b border-slate-800 bg-slate-800/40">
              <img 
                src={mentor.imageUrl} 
                alt={mentor.name} 
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full mx-auto border-4 border-slate-800 shadow-sm mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-white">{mentor.name}</h3>
              <p className="text-sm font-medium text-sky-400 mt-1">{mentor.role}</p>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Expertise</span>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md text-xs font-medium border border-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6 mt-auto">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Availability</span>
                <div className="flex items-center text-sm font-medium text-slate-300">
                  <Calendar size={16} className="mr-2 text-slate-500" />
                  {mentor.availability}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button
                  onClick={() => openAiChat(`You are a friendly coding mentor. Help Michelle prepare for a beginner mentoring session with ${mentor.name}. Ask what she is working on and help her write one clear question to bring to the session.`)}
                  className="bg-sky-500 text-slate-900 py-2 rounded-lg text-sm font-bold hover:bg-sky-400 transition flex items-center justify-center shadow-sm shadow-sky-500/20"
                >
                  <Video size={16} className="mr-2" />
                  Prep
                </button>
                <button
                  onClick={() => openAiChat(`Please help Michelle write a short, polite message to ${mentor.name} asking for beginner-friendly coding guidance.`)}
                  className="bg-slate-800/80 border border-slate-700 text-slate-300 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition flex items-center justify-center shrink-0"
                >
                  <MessageSquare size={16} className="mr-2 text-slate-500" />
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
