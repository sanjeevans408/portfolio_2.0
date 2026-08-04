export interface SkillCategory {
  category: string;
  skills: string[];
  color?: string;
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Next.js"],
    color: "#00F5FF",
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Flask", "Django", "REST APIs", "GraphQL"],
    color: "#7B61FF",
  },
  {
    category: "Database",
    skills: ["SQL", "SQLite", "MongoDB", "Firebase", "PostgreSQL"],
    color: "#FF00FF",
  },
  {
    category: "Programming",
    skills: ["Python", "JavaScript", "C", "SQL", "TypeScript"],
    color: "#00FF88",
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Docker", "Linux", "Postman", "Figma", "Excel"],
    color: "#FFB800",
  },
  {
    category: "AI/ML",
    skills: ["OpenAI", "Machine Learning", "Prompt Engineering", "Automation", "N8N"],
    color: "#FF6B6B",
  },
];

export const technologies = [
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "MongoDB",
  "Express",
  "Firebase",
  "Docker",
  "Git",
  "Linux",
  "PostgreSQL",
  "Flask",
];
