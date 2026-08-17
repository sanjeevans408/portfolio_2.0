export interface SkillItem {
  name: string;
  proficiency: number; // 0–100
  yearsOfExperience: number;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "🖥️",
    color: "#00F5FF",
    skills: [
      { name: "React.js", proficiency: 90, yearsOfExperience: 2, level: "advanced" },
      { name: "JavaScript (ES6+)", proficiency: 88, yearsOfExperience: 3, level: "advanced" },
      { name: "TypeScript", proficiency: 75, yearsOfExperience: 1, level: "intermediate" },
      { name: "Tailwind CSS", proficiency: 85, yearsOfExperience: 2, level: "advanced" },
      { name: "HTML5 / CSS3", proficiency: 92, yearsOfExperience: 3, level: "expert" },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "#7B61FF",
    skills: [
      { name: "Node.js", proficiency: 82, yearsOfExperience: 2, level: "advanced" },
      { name: "Flask", proficiency: 80, yearsOfExperience: 1, level: "advanced" },
      { name: "FastAPI", proficiency: 78, yearsOfExperience: 1, level: "intermediate" },
      { name: "REST APIs", proficiency: 88, yearsOfExperience: 2, level: "advanced" },
      { name: "WebSockets / SSE", proficiency: 75, yearsOfExperience: 1, level: "intermediate" },
      { name: "Python", proficiency: 85, yearsOfExperience: 2, level: "advanced" },
    ],
  },
  {
    category: "Databases",
    icon: "🗄️",
    color: "#FF00FF",
    skills: [
      { name: "MongoDB Atlas", proficiency: 80, yearsOfExperience: 2, level: "advanced" },
      { name: "MySQL", proficiency: 75, yearsOfExperience: 1, level: "intermediate" },
      { name: "PostgreSQL", proficiency: 65, yearsOfExperience: 1, level: "intermediate" },
      { name: "SQLAlchemy", proficiency: 72, yearsOfExperience: 1, level: "intermediate" },
    ],
  },
  {
    category: "AI / ML",
    icon: "🤖",
    color: "#FF6B6B",
    skills: [
      { name: "LangChain", proficiency: 72, yearsOfExperience: 1, level: "intermediate" },
      { name: "NVIDIA NIM API", proficiency: 70, yearsOfExperience: 1, level: "intermediate" },
      { name: "RAG Pipelines", proficiency: 68, yearsOfExperience: 1, level: "intermediate" },
      { name: "Scikit-learn", proficiency: 78, yearsOfExperience: 1, level: "intermediate" },
      { name: "XGBoost", proficiency: 74, yearsOfExperience: 1, level: "intermediate" },
      { name: "Pandas / NumPy", proficiency: 82, yearsOfExperience: 2, level: "advanced" },
      { name: "Prompt Engineering", proficiency: 80, yearsOfExperience: 1, level: "advanced" },
    ],
  },
  {
    category: "Tools & DevOps",
    icon: "🛠️",
    color: "#FFB800",
    skills: [
      { name: "Git / GitHub", proficiency: 88, yearsOfExperience: 3, level: "advanced" },
      { name: "Docker", proficiency: 65, yearsOfExperience: 1, level: "intermediate" },
      { name: "n8n Automation", proficiency: 75, yearsOfExperience: 1, level: "intermediate" },
      { name: "Render", proficiency: 80, yearsOfExperience: 1, level: "advanced" },
      { name: "Streamlit", proficiency: 72, yearsOfExperience: 1, level: "intermediate" },
      { name: "GitHub Pages", proficiency: 85, yearsOfExperience: 2, level: "advanced" },
    ],
  },
];

// Flat list for legacy components
export const skills = skillCategories.map((cat) => ({
  category: cat.category,
  skills: cat.skills.map((s) => s.name),
  color: cat.color,
}));

export const technologies = [
  "React.js",
  "Node.js",
  "Python",
  "Flask",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "Git",
  "LangChain",
  "XGBoost",
  "Tailwind CSS",
  "TypeScript",
];
