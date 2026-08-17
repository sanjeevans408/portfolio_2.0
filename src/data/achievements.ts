import { profile } from "./profile";

export interface Achievement {
  value: string;
  label: string;
  description: string;
  command: string;
}

export const achievements: Achievement[] = [
  {
    value: profile.stats.projects,
    label: "Projects shipped",
    description: "From AI-powered tools to enterprise full-stack web applications.",
    command: "git log --projects",
  },
  {
    value: profile.stats.certificates,
    label: "Certificates earned",
    description: "Continuous learning across development, cloud, data, and AI.",
    command: "learning.progress",
  },
  {
    value: profile.stats.technologies,
    label: "Technologies explored",
    description: "A practical toolkit for turning ideas into working products.",
    command: "stack.inspect()",
  },
  {
    value: profile.stats.yearsExperience,
    label: "Years building",
    description: "Learning fast, iterating often, and improving with every release.",
    command: "experience.timeline",
  },
];
