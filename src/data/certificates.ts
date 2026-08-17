export interface Certificate {
  id: number;
  title: string;
  organization: string;
  date: string;
  credential?: string;
  image?: string;
  featured?: boolean;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Python 101 for Data Science",
    organization: "Kaggle",
    date: "2024",
    image: "/images/certificates/python-data-science.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "HackerRank Certification",
    organization: "HackerRank",
    date: "2024",
    image: "/images/certificates/hackerrank-certification.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "Full Stack MERN Workshop",
    organization: "AnaptyCodeEmy / ECLearnix",
    date: "2024",
  },
  {
    id: 4,
    title: "Cloud Computing",
    organization: "AWS",
    date: "2024",
    image: "/images/certificates/cloud-computing.jpg",
    featured: true,
  },
  {
    id: 5,
    title: "Machine Learning",
    organization: "Coursera",
    date: "2024",
    image: "/images/certificates/machine-learning.jpg",
    featured: true,
  },
  {
    id: 6,
    title: "SQL Workshop",
    organization: "SQL Academy",
    date: "2023",
  },
  {
    id: 7,
    title: "Web Development",
    organization: "Udemy",
    date: "2023",
  },
  {
    id: 8,
    title: "N8N Automation",
    organization: "N8N Community",
    date: "2024",
  },
];
