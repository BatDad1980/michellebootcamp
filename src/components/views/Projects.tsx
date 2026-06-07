import { useData } from '../../context/DataContext';
import { Code, FileText, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Projects() {
  const { projects: PROJECTS, submitProject } = useData();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Practical Projects</h2>
          <p className="text-slate-400 mt-2">Apply your knowledge. Submit assignments and receive personalized feedback.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => {
          
          let statusBadge = null;
          if (project.status === 'graded') {
            statusBadge = <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wide flex items-center gap-1"><CheckCircle2 size={12}/> Graded</span>;
          } else if (project.status === 'submitted') {
            statusBadge = <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wide flex items-center gap-1"><FileText size={12}/> Submitted</span>;
          } else {
            statusBadge = <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wide flex items-center gap-1"><Clock size={12}/> In Progress</span>;
          }

          return (
            <div key={project.id} className="bg-[#161B22] rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 bg-sky-500 rounded-bl-full w-24 h-24 pointer-events-none group-hover:opacity-10 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-slate-800/80 text-slate-300 rounded-lg flex items-center justify-center border border-slate-700 shrink-0">
                  <Code size={20} />
                </div>
                {statusBadge}
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">{project.description}</p>
              
              <div className="border-t border-slate-800 pt-4 mt-auto">
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-slate-400 font-medium">Due Date</span>
                  <span className="text-slate-200 font-mono">{project.dueDate}</span>
                </div>
                
                {project.grade && (
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-slate-400 font-medium">Grade</span>
                    <span className="font-bold text-emerald-400 font-mono text-base">{project.grade}</span>
                  </div>
                )}

                <button
                  onClick={() => project.status === 'in_progress' ? submitProject(project.id) : undefined}
                  disabled={project.status === 'locked'}
                  className={cn(
                  "w-full py-2.5 rounded-lg text-sm font-semibold transition text-center",
                  project.status === 'in_progress' 
                    ? "bg-sky-500 text-slate-900 font-bold hover:bg-sky-400 shadow-sm shadow-sky-500/20"
                    : project.status === 'locked'
                    ? "bg-slate-900/80 text-slate-600 border border-slate-800 cursor-not-allowed"
                    : "bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-800"
                )}>
                  {project.status === 'in_progress' ? 'Mark Submitted' : project.status === 'locked' ? 'Locked' : 'View Details'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
