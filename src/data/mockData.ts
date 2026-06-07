import { BookOpen, Briefcase, Code, LayoutDashboard, Users } from "lucide-react";

export const USER = {
  name: "Michelle Black",
  role: "Student - Aural-Nexus Developer Track",
  progress: 0,
  avatarUrl: "https://picsum.photos/seed/Michelle/150/150",
};

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", shortLabel: "Home", icon: LayoutDashboard },
  { id: "curriculum", label: "Curriculum", shortLabel: "Learn", icon: BookOpen },
  { id: "projects", label: "Projects", shortLabel: "Build", icon: Code },
  { id: "mentorship", label: "Mentorship", shortLabel: "Mentor", icon: Users },
  { id: "career", label: "Career Services", shortLabel: "Career", icon: Briefcase },
];

export const CURRENT_MODULE = {
  title: "Getting Started: Web Foundations",
  module: 1,
  progress: 0,
  nextLesson: "What the web is: pages, code, and browsers",
};

export const LEARNING_PATHS = [
  {
    id: "m1",
    title: "Module 1: Web Foundations",
    description: "HTML, CSS, JavaScript basics, and how websites fit together.",
    status: "in_progress",
    progress: 0,
    lessons: ["What is a website?", "HTML structure", "CSS styling", "JavaScript behavior"],
  },
  {
    id: "m2",
    title: "Module 2: Build Your First App",
    description: "Components, state, events, and small React projects.",
    status: "locked",
    progress: 0,
    lessons: ["React components", "Buttons and events", "Saving progress", "Deploying a page"],
  },
  {
    id: "m3",
    title: "Module 3: Data and APIs",
    description: "Fetch data, read JSON, and connect apps to useful services.",
    status: "locked",
    progress: 0,
    lessons: ["What is an API?", "Reading JSON", "Fetching data", "Handling errors"],
  },
  {
    id: "m4",
    title: "Module 4: Practical AI Tools",
    description: "Use AI safely as a study partner, debugger, and project helper.",
    status: "locked",
    progress: 0,
    lessons: ["Prompting basics", "Debugging with AI", "Checking AI output", "Building a helper bot"],
  },
  {
    id: "m5",
    title: "Module 5: Portfolio and Career Prep",
    description: "Finish projects, practice interviews, and prepare a beginner portfolio.",
    status: "locked",
    progress: 0,
    lessons: ["Project README", "Portfolio polish", "Mock interview", "Next steps plan"],
  },
];

export const PROJECTS = [
  {
    id: "p1",
    title: "Personal Profile Page",
    description: "Build a simple profile page with a heading, image, links, and styled sections.",
    status: "in_progress",
    grade: null,
    dueDate: "Start Here",
  },
  {
    id: "p2",
    title: "Interactive To-Do List",
    description: "Create a small app where a user can add, complete, and remove tasks.",
    status: "locked",
    grade: null,
    dueDate: "After Module 1",
  },
  {
    id: "p3",
    title: "Beginner AI Study Helper",
    description: "Design a safe study assistant prompt and test it against beginner coding questions.",
    status: "locked",
    grade: null,
    dueDate: "After Module 4",
  },
];

export const MENTORS = [
  {
    id: "m1",
    name: "Dr. Sarah Chen",
    role: "Senior AI Researcher @ Google",
    expertise: ["Deep Learning", "NLP"],
    imageUrl: "https://picsum.photos/seed/sarah/150/150",
    availability: "Tuesdays, Thursdays",
  },
  {
    id: "m2",
    name: "Marcus Johnson",
    role: "Lead MLOps Engineer @ Stripe",
    expertise: ["MLOps", "Infrastructure"],
    imageUrl: "https://picsum.photos/seed/marcus/150/150",
    availability: "Mondays, Fridays",
  },
  {
    id: "m3",
    name: "Elena Rodriguez",
    role: "Staff Software Engineer @ OpenAI",
    expertise: ["LLMs", "Agentic Systems"],
    imageUrl: "https://picsum.photos/seed/elena/150/150",
    availability: "Wednesdays",
  },
];

export const JOBS = [
  {
    id: "j1",
    title: "Junior AI Engineer",
    company: "Anthropic",
    location: "San Francisco / Remote",
    type: "Full-time",
    match: 95,
  },
  {
    id: "j2",
    title: "Data Scientist I",
    company: "Airbnb",
    location: "New York",
    type: "Full-time",
    match: 88,
  },
  {
    id: "j3",
    title: "Generative AI Developer (Contract)",
    company: "Startup Co",
    location: "Remote",
    type: "Contract",
    match: 92,
  },
];
