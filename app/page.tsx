"use client";

import { useEffect, useMemo, useState } from "react";
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
  Shield,
  X,
  Zap,
} from "lucide-react";

import { certifications } from "@/lib/certifications";

import {
  placeholderLinks,
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
    label: "Programming",
    icon: Code2,
    skills: ["HTML", "CSS", "JavaScript", "Python", "Java", "MySQL"],
  },
  {
    label: "Tools",
    icon: Network,
    skills: ["VS Code", "GitHub"],
  },
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

function PlaceholderLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} aria-label={`${children} placeholder link`}>
      {children}

      <span className="placeholder-label">placeholder</span>
    </a>
  );
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [active, setActive] = useState("about");

  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");

  const [selected, setSelected] = useState<Project | null>(null);

  const [copied, setCopied] = useState(false);

  const [sent, setSent] = useState(false);

  const [sending, setSending] = useState(false);

  const filteredProjects = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  useEffect(() => {
    const sections = navItems
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }),
      {
        rootMargin: "-30% 0px -60% 0px",
      },
    );

    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }),
      {
        threshold: 0.12,
      },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((element) => revealObserver.observe(element));

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard?.writeText(email);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  /*
   * CONTACT FORM SUBMIT
   *
   * Important:
   * We save event.currentTarget into `form`
   * before the async EmailJS request.
   *
   * This prevents:
   * Cannot read properties of null (reading 'reset')
   */
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const form = event.currentTarget;

    setSending(true);
    setSent(false);

    try {
      await emailjs.sendForm(
        "service_bhsx4r5",
        "template_tvghk5p",
        form,
        {
          publicKey: "saUcKQVx6BIIjZ6E9",
        },
      );

      // Reset the form using the saved reference
      form.reset();

      setSent(true);

      window.setTimeout(() => {
        setSent(false);
      }, 3000);
    } catch (error) {
      console.error("Email failed:", error);

      alert(
        "Message failed to send. Please try again.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <main>
      {/* Background grid */}
      <div
        className="ambient-grid"
        aria-hidden="true"
      />

      {/* ================= HEADER ================= */}

      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="Muralidharan S home"
        >
          <span className="brand-mark">
            MS
          </span>

          <span>
            MURALIDHARAN S
          </span>
        </a>

        <nav
          className={`desktop-nav ${
            menuOpen ? "mobile-open" : ""
          }`}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <a
              key={item}
              className={
                active === item
                  ? "active"
                  : ""
              }
              href={`#${item}`}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          className="header-cta"
          href="#contact"
        >
          Let&apos;s talk

          <ArrowUpRight size={15} />
        </a>

        <button
          className="menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X />
          ) : (
            <Menu />
          )}
        </button>
      </header>

      {/* ================= HERO ================= */}

      <section
        id="top"
        className="hero container"
      >
        <div className="hero-copy reveal">
          <p className="eyebrow">
            <span className="status-dot" />

            Available for opportunities
          </p>

          <h1>
            Hi, I&apos;m{" "}
            <span>MURALIDHARAN</span>
          </h1>

          <p className="hero-role">
            Software Engineer <i>/</i>{" "}
            Web Developer <i>/</i> AI/ML
            Enthusiast
          </p>

          <p className="hero-intro">
            I build modern web applications
            and intelligent solutions with a
            strong interest in software
            development, AI/ML, and emerging
            technologies.
          </p>

          <div className="hero-actions">
            <a
              className="button button-primary"
              href="#projects"
            >
              View my projects

              <ArrowDown size={16} />
            </a>

            <a
              className="button button-ghost"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />

              Download resume
            </a>
          </div>

          <div className="social-row">
            <a
              href="https://github.com/Murali6383"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitBranch size={18} />

              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/muralidharan-s-850069309"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BadgeIcon size={18} />

              LinkedIn
            </a>

            <a
              href={`mailto:${email}`}
            >
              <Mail size={18} />

              Email
            </a>
          </div>
        </div>

        <div className="hero-aside reveal">
          <div className="portrait-frame">
            <img
              src="/images/muralidharan-portrait.png"
              alt="Muralidharan S wearing a professional suit"
            />
          </div>

          <p className="hero-note">
            Turning curiosity into
            <br />

            <strong>
              practical technology.
            </strong>
          </p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="section container"
      >
        <SectionHeading
          eyebrow="01 / About me"
          title="Curious by nature. Practical by design."
          copy="A Computer Science Engineering student focused on building useful, thoughtful technology."
        />

        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I&apos;m a B.E. Computer Science
              Engineering student at IFET
              College of Engineering, with a
              CGPA of <strong>8.70</strong>. My
              interests span software
              development, web experiences,
              and AI/ML project work.
            </p>

            <p>
              I enjoy learning continuously,
              solving problems, and turning
              ideas into practical technology
              solutions. Whether I&apos;m shaping a
              responsive interface or exploring
              a model, I care about clarity and
              real-world value.
            </p>

            <a
              className="inline-link"
              href="#contact"
            >
              Get to know me

              <ChevronRight size={16} />
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
              <span>04</span>

              <small>Projects</small>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}

      <section
        id="skills"
        className="section container"
      >
        <SectionHeading
          eyebrow="02 / Skills"
          title="Tools I use to make ideas real."
        />

        <div className="skills-grid">
          {skillGroups.map(
            ({
              label,
              icon: Icon,
              skills,
            }) => (
              <div
                className="glass-card skill-card reveal"
                key={label}
              >
                <div className="card-heading">
                  <Icon size={20} />

                  <h3>{label}</h3>
                </div>

                <div className="skill-list">
                  {skills.map((skill) => (
                    <span key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}

      <section
        id="experience"
        className="section container"
      >
        <SectionHeading
          eyebrow="03 / Experience"
          title="Learning through doing."
        />

        <div className="experience-card glass-card reveal">
          <div className="experience-icon">
            <BriefcaseBusiness size={23} />
          </div>

          <div>
            <p className="eyebrow">
              February 2025
            </p>

            <h3>
              Web Development &amp; Digital
              Marketing
            </h3>

            <p className="company">
              LayerCodes Software Company
            </p>

            <p className="muted">
              Internship experience focused
              on web development and digital
              marketing.
            </p>
          </div>

          <span className="experience-tag">
            Internship
          </span>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}

      <section
        id="projects"
        className="section container"
      >
        <div className="section-heading-row">
          <SectionHeading
            eyebrow="04 / Selected work"
            title="Projects with a purpose."
            copy="A selection of work across mobile, web development, and AI/ML."
          />

          <div
            className="filter-row"
            role="group"
            aria-label="Filter projects"
          >
            {[
              "All",
              "Web Development",
              "AI/ML",
              "Mobile",
              "Other",
            ].map((item) => (
              <button
                key={item}
                className={
                  filter === item
                    ? "filter active"
                    : "filter"
                }
                onClick={() =>
                  setFilter(
                    item as typeof filter,
                  )
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map(
            (project, index) => (
              <article
                className={`project-card reveal ${
                  project.featured
                    ? "featured"
                    : ""
                }`}
                key={project.id}
                onClick={() =>
                  setSelected(project)
                }
                tabIndex={0}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter"
                  ) {
                    setSelected(project);
                  }
                }}
              >
                <div
                  className={`project-art art-${
                    index + 1
                  }`}
                >
                  <span>
                    {project.category ===
                    "Mobile" ? (
                      <Shield />
                    ) : project.category ===
                      "AI/ML" ? (
                      <Zap />
                    ) : (
                      <Code2 />
                    )}
                  </span>

                  <small>
                    {project.date}
                  </small>
                </div>

                <div className="project-content">
                  <div className="project-meta">
                    <span>
                      {project.category}
                    </span>

                    <ArrowUpRight
                      size={17}
                    />
                  </div>

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  <div className="tag-row">
                    {project.stack
                      .slice(0, 4)
                      .map((tag) => (
                        <span key={tag}>
                          {tag}
                        </span>
                      ))}

                    {project.stack.length >
                      4 && (
                      <span>
                        +
                        {project.stack.length -
                          4}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      {/* ================= EDUCATION ================= */}

      <section
        id="education"
        className="section container"
      >
        <SectionHeading
          eyebrow="05 / Education"
          title="The foundation beneath the work."
        />

        <div className="education-grid">
          <div className="education-card glass-card reveal">
            <div className="timeline-dot">
              <GraduationCap size={19} />
            </div>

            <p className="eyebrow">
              2023 — 2027
            </p>

            <h3>
              Bachelor of Engineering (B.E.)
            </h3>

            <p>
              Computer Science Engineering
            </p>

            <strong>
              IFET College of Engineering,
              Anna University
            </strong>

            <span>
              Villupuram <b>·</b> CGPA: 8.70
            </span>
          </div>

          <div className="education-card glass-card reveal">
            <div className="timeline-dot">
              <GraduationCap size={19} />
            </div>

            <p className="eyebrow">
              2021 — 2022
            </p>

            <h3>
              Higher Secondary
              Certificate
            </h3>

            <p>
              GOVT HR SEC SCHOOL
            </p>

            <strong>
              Panruti
            </strong>

            <span>
              Percentage: 83%
            </span>
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATIONS ================= */}

      <section
        id="certifications"
        className="section container"
      >
        <SectionHeading
          eyebrow="06 / Certifications"
          title="Always learning, always expanding."
        />

        <div className="cert-list">
          {certifications.map(
            (cert, index) => (
              <div
                className="cert-item reveal"
                key={cert.title}
              >
                <div className="cert-marker">
                  <Circle
                    size={9}
                    fill="currentColor"
                  />
                </div>

                <div>
                  <p className="eyebrow">
                    {cert.date}
                  </p>

                  <h3>
                    {cert.title}
                  </h3>

                  <p>
                    {cert.issuer}
                  </p>
                </div>

                <span className="cert-index">
                  0{index + 1}
                </span>
              </div>
            ),
          )}
        </div>
      </section>

      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="section container contact-section"
      >
        <div className="contact-copy reveal">
          <SectionHeading
            eyebrow="07 / Contact"
            title="Let's build something together."
            copy="Have an opportunity, an idea, or just want to say hello? My inbox is open."
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
              {copied ? (
                <Check size={18} />
              ) : (
                <Copy size={18} />
              )}

              {copied
                ? "Copied"
                : "Copy email"}
            </button>

            <a href="tel:+916383091442">
              <Phone size={18} />

              <span>
                +91 6383091442
              </span>
            </a>

            <p>
              <MapPin size={18} />

              Panruti, Tamil Nadu, India
            </p>
          </div>
        </div>

        {/* ================= EMAILJS FORM ================= */}

        <form
          className="contact-form glass-card reveal"
          onSubmit={handleSubmit}
        >
          <label>
            Name

            <input
              required
              type="text"
              name="user_name"
              placeholder="Your name"
            />
          </label>

          <label>
            Email

            <input
              required
              type="email"
              name="user_email"
              placeholder="you@example.com"
            />
          </label>

          <label>
            Message

            <textarea
              required
              name="message"
              rows={5}
              placeholder="Tell me a little about your idea..."
            />
          </label>

          <button
            className="button button-primary"
            type="submit"
            disabled={sending}
          >
            {sending ? (
              <>
                Sending...
                <Send size={16} />
              </>
            ) : sent ? (
              <>
                Message Sent
                <Check size={16} />
              </>
            ) : (
              <>
                Send message
                <Send size={16} />
              </>
            )}
          </button>

          {sent && (
            <p
              className="form-success"
              role="status"
            >
              Thanks! Your message has been
              sent successfully.
            </p>
          )}
        </form>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer container">
        <p>
          © 2026 Muralidharan S
        </p>

        <p>
          Designed &amp; built with
          intention.
        </p>

        <a
          href="#top"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </a>
      </footer>

      {/* ================= PROJECT MODAL ================= */}

      {selected && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() =>
            setSelected(null)
          }
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setSelected(null)
              }
              aria-label="Close project details"
              type="button"
            >
              <X />
            </button>

            <p className="eyebrow">
              {selected.category} ·{" "}
              {selected.date}
            </p>

            <h2 id="modal-title">
              {selected.title}
            </h2>

            <p className="modal-description">
              {selected.description}
            </p>

            <div className="modal-block">
              <p className="eyebrow">
                Technology stack
              </p>

              <div className="tag-row">
                {selected.stack.map(
                  (tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            {selected.functionality && (
              <div className="modal-block">
                <p className="eyebrow">
                  Key functionality
                </p>

                <p className="muted">
                  {selected.functionality}
                </p>
              </div>
            )}

            <div className="modal-actions">
              {selected.github && (
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open GitHub repository"
                >
                  <GitBranch size={16} />

                  GitHub
                </a>
              )}

              <a
                href={placeholderLinks.demo}
                aria-label="Open live demo"
              >
                <ExternalLink
                  size={16}
                />

                Live demo
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= FLOATING BACK TOP ================= */}

      <a
        className="back-top"
        href="#top"
        aria-label="Back to top"
      >
        <ArrowUp size={17} />
      </a>
    </main>
  );
}