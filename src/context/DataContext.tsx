import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { USER as MOCK_USER, CURRENT_MODULE, LEARNING_PATHS, PROJECTS, MENTORS, JOBS } from '../data/mockData';

interface DataContextType {
  userData: typeof MOCK_USER;
  currentModule: typeof CURRENT_MODULE;
  learningPaths: typeof LEARNING_PATHS;
  projects: typeof PROJECTS;
  mentors: typeof MENTORS;
  jobs: typeof JOBS;
  updateModuleProgress: (moduleId: string, increment: number) => void;
  submitProject: (projectId: string) => void;
  resetProgress: () => void;
  isAiChatOpen: boolean;
  openAiChat: (systemPrompt?: string) => void;
  closeAiChat: () => void;
  aiChatPrompt: string;
}

const DataContext = createContext<DataContextType | null>(null);
const BOOTCAMP_DATA_VERSION = 'michelle-starter-v3';

function loadStoredValue<T>(key: string, fallback: T): T {
  try {
    if (localStorage.getItem('bootcampDataVersion') !== BOOTCAMP_DATA_VERSION) {
      return fallback;
    }
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState(() => loadStoredValue('userData', MOCK_USER));
  const [currentModule, setCurrentModule] = useState(() => loadStoredValue('currentModule', CURRENT_MODULE));
  const [learningPaths, setLearningPaths] = useState(() => loadStoredValue('learningPaths', LEARNING_PATHS));
  const [projects, setProjects] = useState(() => loadStoredValue('projects', PROJECTS));
  
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiChatPrompt, setAiChatPrompt] = useState('You are DevForge AI, a senior technical mentor and expert developer. You are helping a student in a coding bootcamp. Be encouraging, concise, and provide code examples when helpful.');

  const mentors = MENTORS; 
  const jobs = JOBS; 

  useEffect(() => { localStorage.setItem('bootcampDataVersion', BOOTCAMP_DATA_VERSION); }, []);
  useEffect(() => { localStorage.setItem('userData', JSON.stringify(userData)); }, [userData]);
  useEffect(() => { localStorage.setItem('currentModule', JSON.stringify(currentModule)); }, [currentModule]);
  useEffect(() => { localStorage.setItem('learningPaths', JSON.stringify(learningPaths)); }, [learningPaths]);
  useEffect(() => { localStorage.setItem('projects', JSON.stringify(projects)); }, [projects]);

  const updateModuleProgress = (moduleId: string, increment: number) => {
    setLearningPaths((paths: typeof LEARNING_PATHS) => paths.map(p => {
      if (p.id === moduleId) {
        const newProgress = Math.min(100, Math.max(0, p.progress + increment));
        return { ...p, progress: newProgress, status: newProgress === 100 ? 'completed' : p.status };
      }
      const completedModuleNumber = Number(moduleId.replace('m', ''));
      const nextModuleId = `m${completedModuleNumber + 1}`;
      if (p.id === nextModuleId) {
        const currentModuleProgress = paths.find(path => path.id === moduleId)?.progress ?? 0;
        if (currentModuleProgress + increment >= 100 && p.status === 'locked') {
          return { ...p, status: 'in_progress' };
        }
      }
      return p;
    }));
    
    setCurrentModule((c: typeof CURRENT_MODULE) => {
       if (c.module.toString() === moduleId.replace('m', '')) {
           return { ...c, progress: Math.min(100, c.progress + increment) };
       }
       return c;
    });

    setUserData((u: typeof MOCK_USER) => ({ ...u, progress: Math.min(100, u.progress + 2) }));
  };

  const submitProject = (projectId: string) => {
    setProjects((projs: typeof PROJECTS) => projs.map(p => p.id === projectId && p.status === 'in_progress' ? { ...p, status: 'submitted', grade: 'Pending' } : p));
    setUserData((u: typeof MOCK_USER) => ({ ...u, progress: Math.min(100, u.progress + 5) }));
  };

  const resetProgress = () => {
    localStorage.setItem('bootcampDataVersion', BOOTCAMP_DATA_VERSION);
    setUserData(MOCK_USER);
    setCurrentModule(CURRENT_MODULE);
    setLearningPaths(LEARNING_PATHS);
    setProjects(PROJECTS);
  };

  const openAiChat = (systemPrompt?: string) => {
    if (systemPrompt) setAiChatPrompt(systemPrompt);
    setIsAiChatOpen(true);
  };
  const closeAiChat = () => setIsAiChatOpen(false);

  return (
    <DataContext.Provider value={{ 
      userData, currentModule, learningPaths, projects, mentors, jobs, 
      updateModuleProgress, submitProject, resetProgress, isAiChatOpen, openAiChat, closeAiChat, aiChatPrompt 
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
