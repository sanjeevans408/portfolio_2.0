export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  type: "internship" | "project" | "achievement";
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Python Developer",
    company: "Infotact Solutions",
    period: "2025-26",
    description: "Developed Python automation scripts and data processing tools",
    type: "internship",
  },
  {
    id: 2,
    title: "Full Stack Development",
    company: "Personal Projects",
    period: "2023 - Present",
    description: "Built 20+ full-stack web applications with React, Node.js, and MongoDB",
    type: "project",
  },
  {
    id: 3,
    title: "AI & Automation",
    company: "Personal Projects",
    period: "2024",
    description: "Created AI chatbots, automation workflows, and ML models using Python and OpenAI",
    type: "project",
  },
  {
    id: 4,
    title: "Hackathon Winner",
    company: "Various Hackathons",
    period: "2024",
    description: "Won multiple hackathons building innovative web solutions",
    type: "achievement",
  },
];

export const education = [
  {
    year: "2021",
    level: "10th Grade",
    school: "School",
  },
  {
    year: "2023",
    level: "12th Grade",
    school: "School",
  },
  {
    year: "2023-2027",
    level: "B.E Computer Science",
    school: "P.S.V College of Engineering & Technology",
  },
];
