import { cn } from '../../lib/utils';
import { useData } from '../../context/DataContext';
import { Lock, CheckCircle, PlayCircle } from 'lucide-react';

export default function Curriculum() {
  const { learningPaths: LEARNING_PATHS, updateModuleProgress, openAiChat } = useData();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Your Learning Path</h2>
        <p className="text-slate-400 mt-2">Start at Module 1. Tap the lesson button when you finish a small step.</p>
      </div>

      <div className="space-y-4">
        {LEARNING_PATHS.map((module) => {
          const isCompleted = module.status === 'completed';
          const isLocked = module.status === 'locked';
          const isInProgress = module.status === 'in_progress';

          return (
            <div 
              key={module.id} 
              className={cn(
                "rounded-2xl border transition-all duration-200 overflow-hidden",
                isInProgress ? "border-sky-500 bg-slate-800/40 shadow-sm shadow-sky-500/10" : "border-slate-800 bg-[#161B22]",
                isLocked && "opacity-60 bg-[#0F1117] grayscale select-none"
              )}
            >
              <div className="p-6 flex items-start gap-4">
                <div className="mt-1 shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="text-emerald-500" size={28} />
                  ) : isLocked ? (
                    <Lock className="text-slate-500" size={28} />
                  ) : (
                    <PlayCircle className="text-sky-500" size={28} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                     <h3 className="text-lg font-bold text-white">{module.title}</h3>
                     {isInProgress && (
                       <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wide">In Progress</span>
                     )}
                  </div>
                  <p className="text-slate-400 mb-4">{module.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                       <div 
                         className={cn("h-1.5 rounded-full", isCompleted ? "bg-emerald-500" : "bg-sky-500")} 
                         style={{ width: `${module.progress}%` }} 
                       />
                    </div>
                    <span className="text-xs font-mono text-slate-400">{module.progress}%</span>
                  </div>

                  {/* Lessons (unfurled if in progress) */}
                  {(isInProgress || isCompleted) && (
                    <div className="mt-6 pt-6 border-t border-slate-800 grid gap-3">
                      {module.lessons.map((lesson, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                           <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 border-slate-700">
                              {/* Fake completion state */}
                              {(isCompleted || (isInProgress && idx === 0)) && <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />}
                           </div>
                           <span className={cn("font-medium", (isCompleted || (isInProgress && idx === 0)) ? "text-slate-200" : "text-slate-500")}>
                             {lesson}
                           </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {isInProgress && (
                     <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button onClick={() => updateModuleProgress(module.id, 25)} className="bg-sky-500 text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-sky-400 transition shadow-sm shadow-sky-500/20">
                           Mark Next Lesson Done
                        </button>
                        <button
                          onClick={() => openAiChat(`Please explain this beginner lesson in simple terms: ${module.lessons[Math.min(module.lessons.length - 1, Math.floor(module.progress / 25))]}. Give Michelle one tiny practice task.`)}
                          className="bg-slate-800/80 text-slate-300 border border-slate-700 px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition"
                        >
                           Explain This Lesson
                        </button>
                     </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
