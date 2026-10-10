export type ProjectCategory =
  | "Web Development"
  | "AI/ML"
  | "Mobile"
  | "Other";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  date: string;
  stack: string[];
  featured: boolean;
  functionality: string;
  image: string;
  github?: string;
  demo?: string;
  liveDemo?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    id: "enterprise-crm",
    title: "Enterprise CRM & Sales Pipeline",
    description:
      "A customer relationship management platform concept that helps sales teams manage leads, track opportunities, organize customer information, and monitor business performance from one dashboard.",
    category: "Web Development",
    date: "Portfolio Project",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "REST API",
    ],
    functionality:
      "Role-based access, customer CRUD, lead assignment, sales pipeline stages, search and filtering, dashboard metrics, and activity history.",
  },
  {
    id: "cloud-cicd-platform",
    title: "Cloud-Native CI/CD Platform",
    description:
      "An end-to-end deployment platform concept for automating application builds, tests, container image creation, and deployments with a clear view of pipeline status and release history.",
    category: "Other",
    date: "Portfolio Project",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85",
    stack: [
      "AWS",
      "Docker",
      "Jenkins",
      "GitHub",
      "Kubernetes",
      "Linux",
      "CI/CD",
    ],
    functionality:
      "Git-based triggers, automated build and test stages, Docker image tagging, deployment status, pipeline logs, rollback planning, and release tracking. Actual pipeline automation requires connecting the CI/CD tools and deployment environment.",
  },
  {
    id: "inventory-order-platform",
    title: "E-Commerce Order & Inventory Platform",
    description:
      "A business operations application concept that connects product inventory and order processing, helping a team track stock levels, review orders, and identify products that need restocking.",
    category: "Web Development",
    date: "Portfolio Project",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
      "Tailwind CSS",
    ],
    functionality:
      "Product management, stock quantity updates, order lifecycle tracking, low-stock alerts, order search, sales summaries, and admin access controls.",
  },
  {
    id: "cloud-observability",
    title: "Cloud Observability & Incident Dashboard",
    description:
      "A monitoring dashboard concept for operations teams to inspect service health, review deployment events, track incidents, and understand infrastructure metrics from one place.",
    category: "Other",
    date: "Portfolio Project",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    stack: [
      "AWS",
      "Docker",
      "Prometheus",
      "Grafana",
      "Linux",
      "Python",
    ],
    functionality:
      "Service health panels, CPU and memory metric visualization, incident severity, event history, alert status, and uptime reporting. Live monitoring requires a connected metrics source.",
  },
  {
    id: "it-service-desk",
    title: "IT Service Desk & Ticketing System",
    description:
      "An internal support portal concept where employees can raise IT issues while support engineers assign tickets, update their progress, and maintain a searchable resolution history.",
    category: "Web Development",
    date: "Portfolio Project",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
    ],
    functionality:
      "Ticket creation, priority levels, assignment, status transitions, internal comments, user authentication, filtering, and support-team dashboards.",
  },
  {
    id: "employee-portal",
    title: "Employee Attendance & Leave Portal",
    description:
      "An employee self-service portal concept that simplifies attendance records, leave requests, manager approvals, and employee reporting for a small or medium-sized organization.",
    category: "Web Development",
    date: "Portfolio Project",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    stack: [
      "Next.js",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "REST API",
      "Tailwind CSS",
    ],
    functionality:
      "Employee profiles, attendance records, leave applications, approval workflows, role-based permissions, and monthly summary reports.",
  },
];