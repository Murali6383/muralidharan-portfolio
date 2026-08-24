export type ProjectCategory =
  | "Web Development"
  | "AI/ML"
  | "Mobile"
  | "Other";

export type Project = {
  id: string;
  title: string;
  date: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  featured?: boolean;
  functionality?: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: "safesphere",
    title: "SafeSphere",
    date: "March 2026",
    category: "Mobile",
    description:
      "Developed SafeSphere, a cross-platform mobile app for AI-powered personal safety and emergency response.",
    stack: [
      "Flutter",
      "Dart",
      "Python",
      "Flask",
      "SQLite",
      "Google Maps API",
      "Provider",
      "AI/ML",
      "GPS",
      "WebSocket",
      "Shared Preferences",
    ],
    featured: true,
    functionality:
      "AI-powered personal safety and emergency response.",
    github: "https://github.com/Murali6383/Hackforge-26",
  },

  {
    id: "ai-interview-system",
    title: "AI Interview System",
    date: "May 2026",
    category: "AI/ML",
    description:
      "Built a React.js frontend and FastAPI backend for seamless resume upload, interview management, and AI interaction.",
    stack: [
      "React.js",
      "FastAPI",
      "Python",
      "Ollama",
      "Llama 3",
      "MongoDB",
      "PDF Parsing",
    ],
    featured: true,
    functionality:
      "Resume upload, interview management, and AI interaction.",
    github: "",
  },

  {
    id: "brain-tumor",
    title: "Brain Tumor Detection Using Python (CNN)",
    date: "February 2025",
    category: "AI/ML",
    description:
      "Developed a CNN-based deep learning model to automatically detect brain tumors from MRI images by classifying scans as tumor or non-tumor.",
    stack: [
      "Python",
      "CNN",
      "Deep Learning",
      "MRI Image Classification",
    ],
    functionality:
      "Classifies MRI scans as tumor or non-tumor.",
    github: "",
  },

  {
    id: "journal",
    title: "JOURNAL Website Landing Page",
    date: "March 2025",
    category: "Web Development",
    description:
      "Built a responsive landing page using HTML, CSS, and JavaScript with engaging content and images to showcase business services. Implemented SEO elements, including optimized titles, keywords and meta descriptions.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "SEO",
    ],
    functionality:
      "Responsive business-services landing page with SEO elements.",
    github: "",
  },
];

export const placeholderLinks = {
  github: "#contact",
  demo: "#contact",
};