export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  bullets: string[];
  type: "internship" | "project" | "freelance";
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Full Stack Development Intern",
    company: "Tech Vedhu Pvt. Ltd.",
    period: "Sep – Nov 2025",
    location: "Bengaluru",
    description:
      "Built responsive web apps and integrated REST APIs in a collaborative engineering team environment.",
    bullets: [
      "Built responsive web apps with React.js, Node.js, HTML/CSS, and MySQL/MongoDB; integrated REST APIs and backend logic.",
      "Applied version control with Git/GitHub and followed industry coding standards in a collaborative team environment.",
    ],
    type: "internship",
  },
  {
    id: 2,
    title: "Python Development Intern",
    company: "Infotact Solutions",
    period: "Dec 2025 – Mar 2026",
    location: "Remote",
    description:
      "Developed Python applications and delivered production-ready code using OOP and data structures.",
    bullets: [
      "Developed Python applications using OOP, data structures, file handling, and exception handling for real-world assignments.",
      "Delivered documented, production-ready code and improved debugging and problem-solving through structured internship projects.",
    ],
    type: "internship",
  },
  {
    id: 3,
    title: "Freelance Developer",
    company: "Fiverr",
    period: "2024 – Present",
    location: "Remote",
    description:
      "Delivering client projects on Fiverr — portfolio websites, full-stack web apps, and AI integrations.",
    bullets: [
      "Completed multiple client deliveries: portfolio websites, React apps, and backend API integrations.",
      "Maintained 5-star ratings with on-time delivery and clean, documented codebases.",
    ],
    type: "freelance",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Personal & Open Source Projects",
    period: "2023 – Present",
    location: "Remote",
    description:
      "Built 20+ full-stack and AI-powered web applications; shipped to production with real users.",
    bullets: [
      "Built 20+ full-stack web applications with React, Node.js, Flask, FastAPI, and MongoDB.",
      "Developed AI chatbots, ML models, automation workflows, and real-time WebSocket applications.",
    ],
    type: "project",
  },
];

export const education = [
  {
    year: "2020–2021",
    level: "10th Grade",
    school: "Government Boys Higher Secondary School, Bargur",
    stream: "Computer Science",
  },
  {
    year: "2022–2023",
    level: "12th Grade",
    school: "Government Boys Higher Secondary School, Bargur",
    stream: "Computer Science",
  },
  {
    year: "Aug 2023 – Aug 2027",
    level: "B.E Computer Science",
    school: "PSV College of Engineering & Technology (Anna University)",
    cgpa: "7.77",
    coursework: [
      "Data Structures",
      "Machine Learning",
      "DBMS",
      "Web Technologies",
      "Software Engineering",
    ],
  },
];
