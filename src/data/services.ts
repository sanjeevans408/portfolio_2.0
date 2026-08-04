export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Portfolio Websites",
    description: "Beautiful, responsive portfolio websites that showcase your work",
    icon: "🌐",
  },
  {
    id: 2,
    title: "Full Stack Development",
    description: "Complete web applications from frontend to backend and database",
    icon: "💻",
  },
  {
    id: 3,
    title: "AI Chatbots",
    description: "Intelligent chatbots powered by AI for customer service",
    icon: "🤖",
  },
  {
    id: 4,
    title: "Automation",
    description: "Workflow automation and process optimization",
    icon: "⚙️",
  },
  {
    id: 5,
    title: "Dashboards",
    description: "Interactive data dashboards and analytics platforms",
    icon: "📊",
  },
  {
    id: 6,
    title: "REST APIs",
    description: "Scalable REST APIs for web and mobile applications",
    icon: "🔌",
  },
  {
    id: 7,
    title: "React Apps",
    description: "Modern, responsive React applications with state management",
    icon: "⚛️",
  },
  {
    id: 8,
    title: "Bug Fixes & Optimization",
    description: "Code review, debugging, and performance optimization",
    icon: "🔧",
  },
];
