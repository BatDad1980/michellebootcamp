import { BookOpen, Briefcase, Code, LayoutDashboard, Users, User, Bell, Search, Star, Target, CheckCircle2 } from "lucide-react";

export const USER = {
  name: "Michelle Black",
  role: "Student - Aural-Nexus Developer Track",
  progress: 68,
  avatarUrl: "https://picsum.photos/seed/Michelle/150/150",
};

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "curriculum", label: "Curriculum", icon: BookOpen },
  { id: "projects", label: "Projects", icon: Code },
  { id: "mentorship", label: "Mentorship", icon: Users },
  { id: "career", label: "Career Services", icon: Briefcase },
];

export const CURRENT_MODULE = {
  title: "Building LLM Agents with LangChain",
  module: 4,
  progress: 40,
  nextLesson: "Memory and Context Window Management",
};

export const LEARNING_PATHS = [
  {
    id: "m1",
    title: "Module 1: Foundations of Machine Learning",
    description: "Statistics, probability, and classic ML algorithms.",
    status: "completed",
    progress: 100,
    lessons: ["Intro to Pandas", "Linear Regression", "Decision Trees"],
  },
  {
    id: "m2",
    title: "Module 2: Deep Learning & Neural Networks",
    description: "PyTorch, CNNs, RNNs, and backpropagation.",
    status: "completed",
    progress: 100,
    lessons: ["Perceptrons", "PyTorch Basics", "Computer Vision"],
  },
  {
    id: "m3",
    title: "Module 3: NLP & Transformer Architecture",
    description: "Attention mechanisms, GPT models, and huggingface.",
    status: "completed",
    progress: 100,
    lessons: ["Tokenization", "Self-Attention", "Fine-Tuning BERT"],
  },
  {
    id: "m4",
    title: "Module 4: Engineering GenAI Apps",
    description: "LLMs, RAG architecture, and agentic workflows.",
    status: "in_progress",
    progress: 40,
    lessons: ["Prompt Engineering", "Vector Databases", "LangChain Basics"],
  },
  {
    id: "m5",
    title: "Module 5: Deployment & MLOps",
    description: "Serving models, Docker, CI/CD, and monitoring.",
    status: "locked",
    progress: 0,
    lessons: ["Dockerizing Models", "AWS Sagemaker", "Model Drift"],
  },
];

export const PROJECTS = [
  {
    id: "p1",
    title: "Predictive Housing Model",
    description: "End-to-end regression model deployed via FAST_API.",
    status: "graded",
    grade: "A",
    dueDate: "2026-01-15",
  },
  {
    id: "p2",
    title: "Semantic Document Search",
    description: "RAG system using Pinecone and OpenAI embeddings.",
    status: "submitted",
    grade: "Pending",
    dueDate: "2026-03-10",
  },
  {
    id: "p3",
    title: "Autonomous Coding Agent",
    description: "Build an LLM agent that writes and fixes Python code.",
    status: "in_progress",
    grade: null,
    dueDate: "2026-05-01",
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
