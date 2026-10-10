"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BadgeIcon,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Circle,
  Code2,
  Copy,
  Download,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Network,
  Phone,
  Send,
  X,
} from "lucide-react";

import { certifications } from "@/lib/certifications";
import {
  projects,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";

const email = "dharani6383@gmail.com";

const navItems = [
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "certifications",
  "contact",
];

const skillGroups = [
  {
    label: "Programming Languages",
    icon: Code2,
    skills: ["Python", "Java (Basics)", "JavaScript", "SQL"],
  },
  {
    label: "Frontend Development",
    icon: Code2,
    skills: [
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    label: "Backend Development",
    icon: Network,
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
  },
  {
    label: "Cloud & DevOps",
    icon: GitBranch,
    skills: [
      "AWS",
      "Docker",
      "Jenkins",
      "Kubernetes",
      "Git",
      "GitHub",
      "CI/CD Fundamentals",
    ],
  },
  {
    label: "Networking",
    icon: Network,
    skills: [
      "CCNA Fundamentals",
      "TCP/IP",
      "DNS",
      "HTTP/HTTPS",
      "Subnetting",
      "Routing & Switching",
      "AWS VPC",
    ],
  },
  {
    label: "Testing & Tools",
    icon: Check,
    skills: [
      "VS Code",
      "Postman",
      "Playwright",
      "API Testing",
      "Debugging",
      "Troubleshooting",
    ],
  },
];

const skillLogoMap: Record<string, string> = {
  Python: "python",
  "Java (Basics)": "openjdk",
  JavaScript: "javascript",
  SQL: "mysql",

  "React.js": "react",
  "Next.js": "nextdotjs",
  HTML5: "html5",
  CSS3: "css3",
  "Tailwind CSS": "tailwindcss",
  Vite: "vite",

  "Node.js": "nodedotjs",
  "Express.js": "express",
  FastAPI: "fastapi",

  AWS: "amazonaws",
  Docker: "docker",
  Jenkins: "jenkins",
  Kubernetes: "kubernetes",
  Git: "git",
  GitHub: "github",

   "VS Code": "vscode",
  Playwright: "playwright",
  Postman: "postman",
};

const projectFilters = [
  "All",
  "Full Stack",
  "AI / ML",
  "DevOps",
];

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

function SkillLogo({ skill }: { skill: string }) {
  const [imageFailed, setImageFailed] = useState(false);
  const slug = skillLogoMap[skill];

  if (!slug || imageFailed) {
    return (
      <span className="skill-logo-fallback" aria-hidden="true">
        <Code2 size={21} />
      </span>
    );
  }

  return (
    <span className="skill-logo">
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt=""
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    </span>
  );
}

/* ================= PROJECT IMAGES ================= */

function getProjectImagePath(project: Project, index: number) {
  return project.image;
}

function getProjectFallbackImage(project: Project) {
  const identity =
    `${project.title} ${project.description}`.toLowerCase();

  if (/health|skin|lesion|sepsis|medical/.test(identity)) {
    return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80";
  }

  return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80";
}

function getProjectDemo(project: Project): string | undefined {
  const data = project as Project & {
    demo?: string;
    liveDemo?: string;
    url?: string;
  };

  const candidate = data.demo ?? data.liveDemo ?? data.url;

  return typeof candidate === "string" &&
    /^https?:\/\//i.test(candidate)
    ? candidate
    : undefined;
}

function ProjectImage({
  project,
  index,
  large = false,
}: {
  project: Project;
  index: number;
  large?: boolean;
}) {
  const [src, setSrc] = useState(() =>
    getProjectImagePath(project, index),
  );
  const [fallbackUsed, setFallbackUsed] = useState(false);

  useEffect(() => {
    setSrc(getProjectImagePath(project, index));
    setFallbackUsed(false);
  }, [project.id, index, project.title, project.description]);

  return (
    <div className={`project-image ${large ? "project-image-large" : ""}`}>
      <img
        src={src}
        alt={`${project.title} project preview`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => {
          if (!fallbackUsed) {
            setFallbackUsed(true);
            setSrc(getProjectFallbackImage(project));
          }
        }}
      />
      <div className="project-image-shade" aria-hidden="true" />
      <span className="project-image-label">
        <span className="project-image-dot" />
        Project preview
      </span>
    </div>
  );
}

/* ================= MAIN PAGE ================= */

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const filteredProjects = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );
  

  /* ================= SCROLL EFFECTS ================= */

  useEffect(() => {
    const sections = navItems
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((element) => revealObserver.observe(element));

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  /* ================= MODAL KEYBOARD SUPPORT ================= */

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  /* ================= COPY EMAIL ================= */

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Failed to copy email:", error);
      window.location.href = `mailto:${email}`;
    }
  };

  /* ================= EMAILJS CONTACT FORM ================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (sending) return;

    const form = event.currentTarget;

    setSending(true);
    setSent(false);
    setErrorMessage("");

    try {
      await emailjs.sendForm(
        "service_bhsx4r5",
        "template_tvghk5p",
        form,
        {
          publicKey: "saUcKQVx6BIIjZ6E9",
        },
      );

      form.reset();
      setSent(true);
    } catch (error) {
      console.error("EmailJS submission failed:", error);

      setErrorMessage(
        "Your message could not be sent. Please try again or email me directly.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <main>
      <style jsx global>{`
        /* ================= PROJECT VISUALS ================= */

        .project-image {
          position: relative;
          isolation: isolate;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 15% 15%,
              rgba(124, 58, 237, 0.34),
              transparent 34%
            ),
            linear-gradient(
              135deg,
              #101827 0%,
              #1e293b 48%,
              #312e81 100%
            );
        }

        .project-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition:
            transform 0.55s ease,
            filter 0.35s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.055);
          filter: saturate(1.08);
        }

        .project-image-shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(8, 12, 24, 0.02) 35%,
            rgba(8, 12, 24, 0.72) 100%
          );
        }

        .project-image-label {
          position: absolute;
          left: 15px;
          bottom: 13px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 11px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          background: rgba(12, 18, 32, 0.68);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          backdrop-filter: blur(12px);
        }

        .project-image-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #a5f3fc;
          box-shadow: 0 0 12px rgba(165, 243, 252, 0.8);
        }

        .project-card {
          overflow: hidden;
          cursor: pointer;
          transition:
            transform 0.28s ease,
            border-color 0.28s ease,
            box-shadow 0.28s ease;
        }

        .project-card:hover {
          transform: translateY(-6px);
          border-color: rgba(99, 102, 241, 0.35);
          box-shadow: 0 22px 55px rgba(15, 23, 42, 0.12);
        }

        .project-card:focus-visible {
          outline: 3px solid #6366f1;
          outline-offset: 4px;
        }

        .project-card .project-image {
          border-radius: 0;
        }

        .project-content {
          padding: 22px;
        }

        .project-image-large {
          margin: 0 0 22px;
          aspect-ratio: 16 / 8.5;
          border-radius: 16px;
        }

        .project-modal {
          position: relative;
          width: min(720px, calc(100% - 28px));
          max-height: min(88vh, 900px);
          overflow-y: auto;
          padding: 26px;
          border: 1px solid rgba(129, 140, 248, 0.24);
          border-radius: 24px;
          background: var(--background, #fff);
          color: var(--foreground, #111827);
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.25);
        }

        .modal-backdrop {
          position: fixed;
          z-index: 1000;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          overflow-y: auto;
          background: rgba(5, 10, 25, 0.76);
          backdrop-filter: blur(10px);
        }

        .modal-close {
          position: sticky;
          z-index: 2;
          top: 0;
          float: right;
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          margin: 0 0 -40px auto;
          border: 1px solid rgba(128, 128, 128, 0.25);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          color: #111827;
          cursor: pointer;
        }

        .modal-description {
          line-height: 1.8;
        }

        .modal-block {
          margin-top: 24px;
        }

        .modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 25px;
        }

        .modal-actions a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 15px;
          border: 1px solid rgba(129, 140, 248, 0.28);
          border-radius: 12px;
          text-decoration: none;
        }

        /* ================= HERO ================= */

        .hero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.65fr);
          align-items: center;
          gap: clamp(32px, 6vw, 90px);
          padding-top: clamp(80px, 12vw, 140px);
          padding-bottom: clamp(70px, 10vw, 120px);
        }

        .hero-copy {
          min-width: 0;
        }

        .hero-availability {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 15px;
          border: 1px solid rgba(99, 102, 241, 0.22);
          border-radius: 999px;
          background: rgba(99, 102, 241, 0.07);
          font-size: 12px;
          font-weight: 600;
        }

        .hero-name {
          display: inline-block;
          background: linear-gradient(
            110deg,
            #6366f1,
            #8b5cf6 55%,
            #06b6d4
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-role-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 9px;
          margin: 22px 0;
          font-size: clamp(15px, 1.7vw, 20px);
          font-weight: 700;
          line-height: 1.8;
        }

        .hero-role-list i {
          color: #818cf8;
          font-style: normal;
        }

        .hero-intro {
          max-width: 650px;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.9;
          opacity: 0.84;
        }

        .hero-specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 25px 0 30px;
        }

        .hero-specialties span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border: 1px solid rgba(129, 140, 248, 0.18);
          border-radius: 12px;
          background: rgba(129, 140, 248, 0.055);
          font-size: 12px;
          font-weight: 600;
          transition:
            transform 0.2s ease,
            border-color 0.2s ease;
        }

        .hero-specialties span:hover {
          transform: translateY(-3px);
          border-color: rgba(129, 140, 248, 0.55);
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
        }

        .hero-actions .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 46px;
        }

        .hero-aside {
          position: relative;
          width: 100%;
          max-width: 380px;
          justify-self: end;
        }

        .portrait-frame {
          overflow: hidden;
          border: 1px solid rgba(129, 140, 248, 0.3);
          border-radius: 28px;
          background: linear-gradient(
            145deg,
            #eef2ff,
            #e0e7ff,
            #cffafe
          );
          box-shadow: 0 25px 80px rgba(79, 70, 229, 0.15);
        }

        .portrait-frame img {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          object-position: center top;
        }

        .hero-profile-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: -28px 16px 0;
          padding: 15px;
          border: 1px solid rgba(129, 140, 248, 0.22);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.94);
          color: #172033;
          box-shadow: 0 14px 40px rgba(15, 23, 42, 0.12);
          backdrop-filter: blur(16px);
        }

        .hero-profile-card strong {
          display: block;
          font-size: 13px;
        }

        .hero-profile-card p {
          margin-top: 5px;
          color: #64748b;
          font-size: 11px;
          line-height: 1.6;
        }

        .hero-profile-card .status-dot {
          flex-shrink: 0;
        }

        .hero-note {
          margin-top: 24px;
          text-align: center;
          line-height: 1.9;
        }

        .hero-note strong {
          color: #818cf8;
        }

        /* ================= CONTACT FORM ================= */

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .contact-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 14px;
          border: 1px solid rgba(128, 128, 128, 0.28);
          border-radius: 12px;
          background: transparent;
          color: inherit;
          font: inherit;
          font-weight: 400;
          outline: none;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #818cf8;
          box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.14);
        }

        .contact-form textarea {
          resize: vertical;
          min-height: 130px;
        }

        .contact-form button:disabled {
          cursor: wait;
          opacity: 0.7;
        }

        .form-success {
          padding: 12px 14px;
          border: 1px solid rgba(22, 163, 74, 0.25);
          border-radius: 12px;
          color: #16a34a;
          font-size: 13px;
          line-height: 1.7;
        }

        .form-error {
          padding: 12px 14px;
          border: 1px solid rgba(220, 38, 38, 0.25);
          border-radius: 12px;
          color: #dc2626;
          font-size: 13px;
          line-height: 1.7;
        }

        .contact-details a,
        .contact-details button,
        .contact-details > p {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 850px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .hero-aside {
            justify-self: center;
            max-width: 340px;
          }
        }

        @media (max-width: 640px) {
          .project-content {
            padding: 18px;
          }

          .project-image-label {
            left: 11px;
            bottom: 10px;
          }

          .project-image-large {
            aspect-ratio: 4 / 3;
          }

          .project-modal {
            padding: 18px;
          }
        }

        @media (max-width: 520px) {
          .hero {
            padding-top: 65px;
          }

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-actions .button {
            width: 100%;
          }

          .hero-specialties {
            gap: 8px;
          }

          .hero-specialties span {
            font-size: 11px;
          }

          .hero-role-list {
            gap: 7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-image img,
          .project-card,
          .hero-specialties span {
            transition: none;
          }

          .project-card:hover,
          .hero-specialties span:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="ambient-grid" aria-hidden="true" />

      {/* ================= HEADER ================= */}

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Muralidharan S home">
          <span className="brand-mark">MS</span>
          <span>MURALIDHARAN S</span>
        </a>

        <nav
          className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <a
              key={item}
              className={active === item ? "active" : ""}
              href={`#${item}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contact">
          Hire Me <ArrowUpRight size={15} />
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          type="button"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* ================= HERO ================= */}

      <section id="top" className="hero container">
        <div className="hero-copy reveal">
          <p className="eyebrow hero-availability">
            <span className="status-dot" />
            Available for Freelance Projects & Opportunities
          </p>

          <h1>
            Hi, I&apos;m <span className="hero-name">MURALIDHARAN S</span>
          </h1>

          <div className="hero-role-list">
            <span>Full Stack Developer</span>
            <i>·</i>
            <span>DevOps Engineer</span>
            <i>·</i>
            <span>Freelancer</span>
          </div>

          <p className="hero-intro">
            I build modern websites, full-stack applications, and practical
            cloud-based solutions. From responsive user interfaces to backend
            APIs and deployment workflows, I enjoy turning ideas into useful
            digital products for businesses and real-world users.
          </p>

          <div className="hero-specialties">
            <span><Code2 size={15} /> Full Stack Development</span>
            <span><Network size={15} /> Cloud & DevOps</span>
            <span><BriefcaseBusiness size={15} /> Freelance Projects</span>
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore My Projects <ArrowDown size={16} />
            </a>

            <a className="button button-ghost" href="#contact">
              Hire Me for a Project <ArrowUpRight size={16} />
            </a>

            <a
              className="button button-ghost"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} /> View Resume
            </a>
          </div>

          <div className="social-row">
            <a
              href="https://github.com/Murali6383"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitBranch size={18} /> GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/muralidharan-s-850069309"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BadgeIcon size={18} /> LinkedIn
            </a>

            <a href={`mailto:${email}`}>
              <Mail size={18} /> Email
            </a>
          </div>
        </div>

        <div className="hero-aside reveal">
          <div className="portrait-frame">
            <img
              src="/images/muralidharan-portrait.png"
              alt="Muralidharan S, Full Stack Developer and DevOps Engineer"
            />
          </div>

          <div className="hero-profile-card">
            <span className="status-dot" />
            <div>
              <strong>Open to freelance work</strong>
              <p>Websites · Applications · Deployment</p>
            </div>
          </div>

          <p className="hero-note">
            Building digital experiences,
            <br />
            <strong>one project at a time.</strong>
          </p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section id="about" className="section container">
        <SectionHeading
          eyebrow="01 / About Me"
          title="Curious by nature. Practical by design."
          copy="A Computer Science Engineering student focused on building useful, thoughtful technology."
        />

        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I&apos;m a B.E. Computer Science Engineering student at IFET
              College of Engineering, with a CGPA of <strong>8.70</strong>.
              My interests include full-stack development, cloud technologies,
              DevOps, and AI/ML projects.
            </p>

            <p>
              I work on full-stack applications, responsive websites, REST
              APIs, and cloud deployment projects. I also explore DevOps
              workflows with tools such as Git, Docker, Jenkins, AWS, and
              Kubernetes through hands-on practice.
            </p>

            <p>
              As a freelancer, I&apos;m interested in helping individuals and
              small businesses establish their online presence with practical,
              user-friendly websites. I focus on clear communication,
              maintainable code, and solutions that address real business needs.
            </p>

            <a className="inline-link" href="#contact">
              Let&apos;s discuss your project <ChevronRight size={16} />
            </a>
          </div>

          <div className="about-stats reveal">
            <div>
              <span>8.70</span>
              <small>CGPA</small>
            </div>
            <div>
              <span>2027</span>
              <small>Graduation</small>
            </div>
            <div>
              <span>{String(projects.length).padStart(2, "0")}</span>
              <small>Projects</small>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}

      <section id="skills" className="section container">
        <SectionHeading
          eyebrow="02 / Technical Skills"
          title="My technical toolkit."
          copy="Technologies and tools I use in my development projects and hands-on learning."
        />

      <div className="skills-grid">
      {skillGroups.map(({ label, icon: Icon, skills }) => (
      <div className="glass-card skill-card reveal" key={label}>
      <div className="card-heading">
        <Icon size={20} />
        <h3>{label}</h3>
      </div>

      <div className="skill-list skill-logo-list">
        {skills.map((skill) => (
          <div className="skill-logo-item" key={skill}>
            <SkillLogo skill={skill} />
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
      </section>

      {/* ================= EXPERIENCE ================= */}

      <section id="experience" className="section container">
        <SectionHeading
          eyebrow="03 / Experience"
          title="Learning through doing."
          copy="Experience that helped me explore practical software and digital workflows."
        />

        <div className="experience-card glass-card reveal">
          <div className="experience-icon">
            <BriefcaseBusiness size={23} />
          </div>

          <div>
            <p className="eyebrow">February 2025</p>
            <h3>Web Development & Digital Marketing</h3>
            <p className="company">LayerCodes Software Company</p>
            <p className="muted">
              Internship experience focused on web development and digital
              marketing.
            </p>
          </div>

          <span className="experience-tag">Internship</span>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}

      <section id="projects" className="section container">
        <div className="section-heading-row">
          <SectionHeading
            eyebrow="04 / Selected Work"
            title="Projects with a purpose."
            copy="Explore my work across full-stack development, AI/ML, cloud, and mobile. Open a project to view its stack, functionality, and available links."
          />

          <div className="filter-row" role="group" aria-label="Filter projects">
            {projectFilters.map((item) => (
              <button
                key={item}
                className={filter === item ? "filter active" : "filter"}
                onClick={() => setFilter(item)}
                type="button"
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <article
              className={`project-card reveal ${project.featured ? "featured" : ""}`}
              key={project.id}
              onClick={() => setSelected(project)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${project.title}`}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelected(project);
                }
              }}
            >
              <ProjectImage project={project} index={index} />

              <div className="project-content">
                <div className="project-meta">
                  <span>{project.category}</span>
                  <ArrowUpRight size={17} />
                </div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tag-row">
                  {project.stack.slice(0, 4).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}

                  {project.stack.length > 4 && (
                    <span>+{project.stack.length - 4}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="muted">
            No projects found in this category yet.
          </p>
        )}
      </section>

      {/* ================= EDUCATION ================= */}

      <section id="education" className="section container">
        <SectionHeading
          eyebrow="05 / Education"
          title="The foundation beneath the work."
        />

        <div className="education-grid">
          <div className="education-card glass-card reveal">
            <div className="timeline-dot">
              <GraduationCap size={19} />
            </div>

            <p className="eyebrow">2023 — 2027</p>
            <h3>Bachelor of Engineering (B.E.)</h3>
            <p>Computer Science Engineering</p>
            <strong>IFET College of Engineering, Anna University</strong>
            <span>Villupuram · CGPA: 8.70</span>
          </div>

          <div className="education-card glass-card reveal">
            <div className="timeline-dot">
              <GraduationCap size={19} />
            </div>

            <p className="eyebrow">2021 — 2022</p>
            <h3>Higher Secondary Certificate</h3>
            <p>GOVT HR SEC SCHOOL</p>
            <strong>Panruti</strong>
            <span>Percentage: 83%</span>
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATIONS ================= */}

      <section id="certifications" className="section container">
        <SectionHeading
          eyebrow="06 / Certifications"
          title="Always learning, always expanding."
          copy="Certifications and learning milestones that support my technical journey."
        />

        <div className="cert-list">
          {certifications.map((cert, index) => (
            <div className="cert-item reveal" key={cert.title}>
              <div className="cert-marker">
                <Circle size={9} fill="currentColor" />
              </div>

              <div>
                <p className="eyebrow">{cert.date}</p>
                <h3>{cert.title}</h3>
                <p>{cert.issuer}</p>
              </div>

              <span className="cert-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="section container contact-section"
      >
        <div className="contact-copy reveal">
          <SectionHeading
            eyebrow="07 / Work With Me"
            title="Have an idea? Let’s build it."
            copy="Looking for a website, a full-stack application, or help with deployment? Tell me about your project. Let's discuss how I can help."
          />

          <div className="contact-details">
            <a href={`mailto:${email}`}>
              <Mail size={18} />
              <span>{email}</span>
            </a>

            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              type="button"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied" : "Copy email"}
            </button>

            <a href="tel:+916383091442">
              <Phone size={18} />
              <span>+91 6383091442</span>
            </a>

            <p>
              <MapPin size={18} />
              Panruti, Tamil Nadu, India
            </p>
          </div>
        </div>

        <form
          className="contact-form glass-card reveal"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="eyebrow">PROJECT ENQUIRY</p>
            <h3>Tell me what you have in mind.</h3>
            <p className="muted">
              Share a few details and I’ll receive your message by email.
            </p>
          </div>

          <label htmlFor="contact-name">
            Name
            <input
              id="contact-name"
              required
              type="text"
              name="user_name"
              placeholder="Your name"
              autoComplete="name"
              maxLength={100}
              disabled={sending}
            />
          </label>

          <label htmlFor="contact-email">
            Email
            <input
              id="contact-email"
              required
              type="email"
              name="user_email"
              placeholder="you@example.com"
              autoComplete="email"
              maxLength={254}
              disabled={sending}
            />
          </label>

          <label htmlFor="contact-message">
            Project details / Message
            <textarea
              id="contact-message"
              required
              name="message"
              rows={5}
              placeholder="Tell me about your idea, requirements, or project..."
              maxLength={5000}
              disabled={sending}
            />
          </label>

          <button
            className="button button-primary"
            type="submit"
            disabled={sending}
          >
            {sending ? (
              <>
                Sending... <Send size={16} />
              </>
            ) : sent ? (
              <>
                Message Sent <Check size={16} />
              </>
            ) : (
              <>
                Send Project Enquiry <Send size={16} />
              </>
            )}
          </button>

          {sent && (
            <p className="form-success" role="status" aria-live="polite">
              Thank you! Your message was sent successfully.
            </p>
          )}

          {errorMessage && (
            <p className="form-error" role="alert" aria-live="assertive">
              {errorMessage}
            </p>
          )}

          <p className="muted">
            Your message will be sent to my email inbox.
          </p>
        </form>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer container">
        <p>© {new Date().getFullYear()} Muralidharan S</p>

        <p>Full Stack Developer · DevOps Engineer · Freelancer</p>

        <a href="#top" aria-label="Back to top">
          <ArrowUp size={16} />
        </a>
      </footer>

      {/* ================= PROJECT DETAILS MODAL ================= */}

      {selected && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelected(null)}
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close project details"
              type="button"
            >
              <X />
            </button>

            <ProjectImage
              project={selected}
              index={Math.max(
                0,
                projects.findIndex((project) => project.id === selected.id),
              )}
              large
            />

            <p className="eyebrow">
              {selected.category} · {selected.date}
            </p>

            <h2 id="modal-title">{selected.title}</h2>

            <p className="modal-description">{selected.description}</p>

            <div className="modal-block">
              <p className="eyebrow">Technology Stack</p>
              <div className="tag-row">
                {selected.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            {selected.functionality && (
              <div className="modal-block">
                <p className="eyebrow">Key Functionality</p>
                <p className="muted">{selected.functionality}</p>
              </div>
            )}

            <div className="modal-actions">
              {selected.github && (
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open GitHub repository"
                  onClick={(event) => event.stopPropagation()}
                >
                  <GitBranch size={16} />
                  GitHub Repository
                </a>
              )}

              {getProjectDemo(selected) && (
                <a
                  href={getProjectDemo(selected)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${selected.title} live demo`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= BACK TO TOP ================= */}

      <a className="back-top" href="#top" aria-label="Back to top">
        <ArrowUp size={17} />
      </a>
    </main>
  );
}