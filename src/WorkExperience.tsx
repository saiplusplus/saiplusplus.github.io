import './WorkExperience.css';
import amazonLogo from './assets/amazon_logo.jpg';
import awsLogo from './assets/amazon_web_services_logo.jpg';
import volvoLogo from './assets/volvo_group_logo.jpg';
import gatechLogo from './assets/college_of_computing_at_georgia_tech_logo.jpg';
import awsPhoto from './assets/awsIntern.jpg';
import volvoPhoto from './assets/volvoIntern.jpg';

// ============================================================
// WORK EXPERIENCE DATA — edit this to update your timeline
// ============================================================
interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
  logo: string;
  photo?: string; // personal photo for this role — drop in assets and set the path
  skills: string[];
}

const JOBS: Job[] = [
  {
    company: 'Amazon.com (Amazon Air)',
    role: 'Supply Chain Manager Intern',
    period: 'May 2026 – Current',
    description:
      'Really a cool role, currently in it. Doing a mix of software development (data consolidation across 9+ MRO portals) and business program management. Get to work with aircraft engines, dream come true.  ',
    logo: amazonLogo,
    photo: undefined, // e.g. import amazonPhoto from './assets/photo-amazon.jpg'
    skills: ['Program Management', 'Data Engineering', 'Software Development'],
  },
  {
    company: 'Amazon Web Services (Professional Services)',
    role: 'Cloud Consultant Intern',
    period: 'May 2025 – Jun 2025',
    description:
      'Mix of Product Management + Software Development. Conducted requirements gathering + Amazon working backwards process for internal agentic AI tool to help consultants study for AWS certs. Then I went out and built. Learned a hell lot of AI engineering. Highly praised product, generated practice quizzes based off AWS docs.',
    logo: awsLogo,
    photo: awsPhoto,
    skills: ['Product Management', 'AI Engineering', 'Full-stack Development'],
  },
  {
    company: 'Volvo Group',
    role: 'Data Scientist Intern',
    period: 'Jan 2025 – May 2025',
    description:
      'What an awwesome experience. God Bless Bao Tran for getting me this job. Wrote many python data analysis modules for vehicle dynamics simulation. Patented a algorithmic vehicle tuning system. Made family. Absolute blast.',
    logo: volvoLogo,
    photo: volvoPhoto,
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization (Grafana)'],
  },
  {
    company: 'Georgia Tech College of Computing',
    role: 'Senior Teaching Assistant',
    period: 'Jan 2024 – Current',
    description:
      'Promoted to lead course development for 1000+ students. Highly praised for my presentation ability, making CS accesible, simple, and inviting. Anyone can compute! (Did Discrete Math now Object Oriented Programming)',
    logo: gatechLogo,
    photo: undefined, // e.g. import gatechPhoto from './assets/photo-gatech.jpg'
    skills: ['Presentation', 'Curriculum Development', 'Program Management', 'Leadership'],
  },
];
// ============================================================

interface WorkExperienceProps {
  onBack: () => void;
  linkedInUrl: string;
  blogUrl: string;
  onGoHome: () => void;
}

export default function WorkExperience({ onBack, linkedInUrl, blogUrl, onGoHome }: WorkExperienceProps) {
  return (
    <div className="we-page">
      {/* ── Navbar ── */}
      <nav className="navbar">
        <ul className="navbar--items">
          <li>
            <a className="navbar--content" href="#about" onClick={(e) => { e.preventDefault(); onGoHome(); }}>
              About Me
            </a>
          </li>
          <li>
            <a className="navbar--content navbar--content--active" href="#experience">
              Work Experience
            </a>
          </li>
          <li>
            <a className="navbar--content" href={blogUrl} target="_blank" rel="noopener noreferrer">
              Blog
            </a>
          </li>
        </ul>
      </nav>
      {/* Back arrow */}
      <button className="we-back" onClick={onBack} aria-label="Go back">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>

      {/* Page title */}
      <h1 className="we-title">Work Experience</h1>

      {/* LinkedIn subtitle */}
      <p className="we-linkedin-hint">
        More details on my{' '}
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="we-linkedin-link"
        >
          LinkedIn
        </a>
      </p>

      {/* Timeline */}
      <ol className="we-timeline" aria-label="Work experience timeline">
        {JOBS.map((job, index) => (
          <li key={index} className="we-item">
            {/* Photo + Logo (left of timeline line) */}
            <div className="we-logo-wrap">
              {job.photo ? (
                <div className="we-photo-card">
                  <img src={job.photo} alt={`${job.role} at ${job.company}`} className="we-photo-img" />
                  <div className="we-logo-badge">
                    <img src={job.logo} alt={`${job.company} logo`} className="we-logo-img" />
                  </div>
                </div>
              ) : (
                <div className="we-logo">
                  <img src={job.logo} alt={`${job.company} logo`} className="we-logo-img" />
                </div>
              )}
            </div>

            {/* Connector line + dot */}
            <div className="we-connector" aria-hidden="true">
              <div className="we-dot" />
              {index < JOBS.length - 1 && <div className="we-line" />}
            </div>

            {/* Text */}
            <div className="we-content">
              <p className="we-period">{job.period}</p>
              <h2 className="we-role">{job.role}</h2>
              <p className="we-company">{job.company}</p>
              <p className="we-desc">{job.description}</p>
              <div className="we-skills">
                <span className="we-skills-label">Key skills:</span>
                {job.skills.map((skill, i) => (
                  <span key={i} className="we-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
