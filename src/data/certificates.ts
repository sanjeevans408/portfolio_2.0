export interface Certificate {
  id: number;
  title: string;
  organization: string;
  date: string;
  credential?: string;
  image?: string;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "HackerRank Certification",
    organization: "HackerRank",
    date: "2024",
  },
  {
    id: 2,
    title: "Python Data Science",
    organization: "Kaggle",
    date: "2024",
  },
  {
    id: 3,
    title: "MERN Stack Workshop",
    organization: "ECLearnix",
    date: "2024",
  },
  {
    id: 4,
    title: "SQL Workshop",
    organization: "SQL Academy",
    date: "2023",
  },
  {
    id: 5,
    title: "Cloud Computing",
    organization: "AWS",
    date: "2024",
  },
  {
    id: 6,
    title: "Web Development",
    organization: "Udemy",
    date: "2023",
  },
  {
    id: 7,
    title: "N8N Automation",
    organization: "N8N Community",
    date: "2024",
  },
  {
    id: 8,
    title: "Machine Learning",
    organization: "Coursera",
    date: "2024",
  },
];
