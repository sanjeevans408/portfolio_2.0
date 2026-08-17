export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  live: string;
  github: string;
  features?: string[];
  category: "fullstack" | "ai" | "realtime" | "ml" | "tools";
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "assetflow",
    title: "AssetFlow",
    description:
      "Enterprise asset management system with RBAC, async APIs, JWT authentication, and real-time WebSocket notifications.",
    image: "/images/projects/assetflow.png",
    tech: ["FastAPI", "SQLAlchemy", "WebSocket", "React", "Vite", "JWT"],
    live: "https://assetflow.onrender.com/",
    github: "https://github.com/sanjeevans408/assetflow",
    features: [
      "Role-Based Access Control (RBAC)",
      "Async REST APIs with FastAPI",
      "Real-time WebSocket notifications",
      "JWT Authentication",
      "React/Vite frontend",
    ],
    category: "fullstack",
  },
  {
    id: 2,
    slug: "nemo-ai-chatbot",
    title: "Nemo — AI Chatbot",
    description:
      "AI chatbot with real-time SSE streaming using NVIDIA NIM API and Flask backend. Mobile-first dark-theme UI.",
    image: "/images/projects/chatbot.png",
    tech: ["NVIDIA NIM API", "Flask", "LLM", "Python", "SSE", "JavaScript"],
    live: "https://chat-bot-2hxs.onrender.com/",
    github: "https://github.com/sanjeevans408/ai-chatbot",
    features: [
      "NVIDIA NIM API integration",
      "Real-time SSE streaming",
      "Mobile-first dark-theme UI",
      "Flask backend",
      "Conversational memory",
    ],
    category: "ai",
  },
  {
    id: 3,
    slug: "pingback-realtime-chat",
    title: "Pingback — Real-Time Chat",
    description:
      "Multi-user real-time group chat with WebSocket messaging and live delivery. Deployed on Render.",
    image: "/images/projects/realchat.png",
    tech: ["Flask-SocketIO", "MongoDB Atlas", "JavaScript", "HTML/CSS"],
    live: "https://realchat-8pip.onrender.com/",
    github: "https://github.com/sanjeevans408/realtime-chat",
    features: [
      "Real-time WebSocket messaging",
      "Multi-user group chat",
      "MongoDB Atlas persistence",
      "Live delivery indicators",
      "Deployed on Render",
    ],
    category: "realtime",
  },
  {
    id: 4,
    slug: "ipl-win-predictor",
    title: "IPL Win Predictor",
    description:
      "ML ensemble win-probability engine with 10,000+ Monte Carlo scenarios per match and an interactive HTML dashboard.",
    image: "/images/projects/ipl.png",
    tech: ["XGBoost", "Random Forest", "Monte Carlo", "Python", "Pandas", "NumPy"],
    live: "https://sanjeevans408.github.io/ipl-predictor/",
    github: "https://github.com/sanjeevans408/ipl-predictor",
    features: [
      "XGBoost + Random Forest ensemble",
      "10,000+ Monte Carlo simulations",
      "Interactive HTML dashboard",
      "Real-time win probability",
      "Historical match data analysis",
    ],
    category: "ml",
  },
  {
    id: 5,
    slug: "web-scraper-extract01",
    title: "Web Scraper EXTRACT/01",
    description:
      "Browser-based scraper UI with live data extraction and CSV export, hosted on GitHub Pages.",
    image: "/images/projects/webscrapper.png",
    tech: ["ScraperAPI", "JavaScript", "HTML5", "CSS3"],
    live: "https://sanjeevans408.github.io/webscrapper/",
    github: "https://github.com/sanjeevans408/webscrapper",
    features: [
      "Live data extraction",
      "CSV export",
      "ScraperAPI integration",
      "Browser-based UI",
      "GitHub Pages hosted",
    ],
    category: "tools",
  },
  {
    id: 6,
    slug: "gym-management-system",
    title: "Gym Management System",
    description:
      "Complete gym website with membership management, admin dashboard, and payment integration.",
    image: "/images/projects/gym.png",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    live: "https://gym-app-0t57.onrender.com/",
    github: "https://github.com/sanjeevans408/gym-management",
    features: [
      "Membership management system",
      "Admin dashboard",
      "Stripe payment integration",
      "Authentication & authorization",
      "Responsive design",
    ],
    category: "fullstack",
  },
];

export const futureProjects = [
  "DocuMind AI — AI-powered document processing with RAG",
  "StatBot — Real-time statistics dashboard",
  "Smart Campus — Campus management platform",
  "AI Portfolio Builder — Automated portfolio generator",
];
