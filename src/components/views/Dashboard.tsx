import { useData } from '../../context/DataContext';
import { Target, CheckCircle2, Flame, Award } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { userData: MOCK_USER, currentModule: CURRENT_MODULE } = useData();

  const pieData = [
    { name: 'Completed', value: MOCK_USER.progress },
    { name: 'Remaining', value: 100 - MOCK_USER.progress }
  ];
  const COLORS = ['#0ea5e9', '#1e293b'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, {MOCK_USER.name.split(' ')[0]}.</h1>
          <p className="text-slate-400 mt-1">You're on track to complete the {MOCK_USER.role.split(' - ')[1]} path by next month.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Progress Card */}
        <div className="col-span-1 md:col-span-1 bg-[#161B22] rounded-2xl border border-slate-800 p-6 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-2">
             <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Overall Progress</h3>
             <Target className="text-sky-500 w-5 h-5" />
          </div>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={75}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-light text-white">{MOCK_USER.progress}%</span>
            </div>
          </div>
        </div>

        {/* Current Module Card */}
        <div className="col-span-1 md:col-span-2 bg-slate-800/40 border border-slate-700 rounded-2xl p-6 flex flex-col shadow-sm relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-[0.03] blur-xl">
            <Target className="w-64 h-64 text-sky-500" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-sky-500/10 rounded-lg text-xs font-bold text-sky-400 mb-4 uppercase tracking-wider">
                CURRENT FOCUS
              </span>
              <h2 className="text-2xl font-bold mb-2 text-white">{CURRENT_MODULE.title}</h2>
              <p className="text-slate-400">Next active lesson: <span className="font-medium text-slate-200">{CURRENT_MODULE.nextLesson}</span></p>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between text-sm mb-2 font-medium">
                <span className="text-slate-400">Module Progress</span>
                <span className="text-slate-300">{CURRENT_MODULE.progress}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2">
                <div className="bg-sky-500 h-2 rounded-full" style={{ width: `${CURRENT_MODULE.progress}%` }}></div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="bg-sky-500 text-slate-900 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-sky-400 transition shadow-lg shadow-sky-500/10">
                  Resume Lesson
                </button>
                <button className="bg-slate-800/80 text-slate-300 border border-slate-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition">
                  View Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#161B22] p-5 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500/10 text-orange-400 rounded-xl flex items-center justify-center shrink-0">
            <Flame size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono">14 Days</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold mt-1">Current Streak</div>
          </div>
        </div>
        
        <div className="bg-[#161B22] p-5 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono">12</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold mt-1">Lessons Passed</div>
          </div>
        </div>

        <div className="bg-[#161B22] p-5 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-4 md:col-span-2">
          <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center shrink-0">
            <Award size={24} />
          </div>
          <div>
            <div className="font-bold text-white">Next Milestone: AI Architect Badge</div>
            <div className="text-sm text-slate-400 mt-1">Complete Module 4 to earn this certification badge.</div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
