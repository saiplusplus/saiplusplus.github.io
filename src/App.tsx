import { useState, useEffect } from 'react'
import './App.css'
import profilePlaceholder from './assets/hero.JPG'
import WorkExperience from './WorkExperience'
import AboutMe from './AboutMe'
import EASTER_EGGS from './easter-eggs/index'

// ============================================================
// PERSONAL CONFIG — edit only this section to customise the page
// ============================================================
const OWNER_NAME        = 'SaiBalaji (Sai) Nagarajan';
const OWNER_BIO         = 'Thanks for visiting my website! I am a 4th year computer science student at Georgia Tech. My mission is to help build a world that is more sustainable, happy, and humorous. Particularly interested in commercial aviation, entertainment, and transportation.\nLet\'s chat!';
const OWNER_KEYWORDS    = 'data science, product/program management, builder, leader';
const PROFILE_IMAGE_SRC = profilePlaceholder;
const PROFILE_IMAGE_ALT = 'Profile photo placeholder';
const LINKEDIN_URL      = 'https://linkedin.com/in/saibalaji-n';
const GITHUB_URL        = 'https://github.com/saiplusplus';
const RESUME_PATH       = '/resume.pdf';
const BLOG_URL          = 'https://hellosaibalaji.substack.com/archive';
const OWNER_EMAIL       = 'saibalaji [at] gatech.edu';
// ============================================================

// Brand icons as inline SVGs
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ResumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6zm2-7h8v1.5H8V13zm0 3h8v1.5H8V16zm0-6h3v1.5H8V10z"/>
  </svg>
);

interface LinkButtonProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  download?: boolean;
  newTab?: boolean;
}

function LinkButton({ label, href, icon, download, newTab }: LinkButtonProps) {
  if (href.trim() === '') {
    return (
      <span role="button" aria-disabled="true" className="link-btn link-btn--disabled">
        {icon}
        {label}
      </span>
    );
  }

  return (
    <a
      className="link-btn"
      href={href}
      {...(download ? { download: true } : {})}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {icon}
      {label}
    </a>
  );
}

type Page = 'home' | 'experience' | 'about';

function hashToPage(hash: string): Page {
  if (hash === '#experience') return 'experience';
  if (hash === '#about') return 'about';
  return 'home';
}

function App() {
  const [page, setPage] = useState<Page>(() => hashToPage(window.location.hash));
  const [showEggs] = useState(true); // set to false after first mount via effect
  const [eggKey, setEggKey] = useState(0);

  useEffect(() => {
    // Trigger eggs once on first home page load
    setEggKey(k => k + 1);
  }, []);

  const navigate = (p: Page) => {
    const hash = p === 'home' ? '' : `#${p}`;
    window.location.hash = hash;
    window.scrollTo(0, 0);
    setPage(p);
  };

  useEffect(() => {
    const onHashChange = () => setPage(hashToPage(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (page === 'experience') {
    return <WorkExperience onBack={() => navigate('home')} linkedInUrl={LINKEDIN_URL} blogUrl={BLOG_URL} onGoHome={() => navigate('about')} />;
  }

  if (page === 'about') {
    return <AboutMe onGoExperience={() => navigate('experience')} onGoHome={() => navigate('home')} blogUrl={BLOG_URL} />;
  }

  return (
    <>
      {/* ── Easter eggs (home page, first visit only) ── */}
      {page === 'home' && showEggs && eggKey > 0 && EASTER_EGGS
        .filter(e => e.active)
        .map(e => <e.component key={`${e.id}-${eggKey}`} />)
      }

      {/* ── Navbar ── */}
      <nav className="navbar">
        
        <ul className="navbar--items">
          <li><a className="navbar--content" href="#about" onClick={(e) => { e.preventDefault(); navigate('about'); }}>About Me</a></li>
          <li><a className="navbar--content" href="#experience" onClick={(e) => { e.preventDefault(); navigate('experience'); }}>Work Experience</a></li>
          <li><a className="navbar--content" href={BLOG_URL} target="_blank" rel="noopener noreferrer">Blog</a></li>
        </ul>
      </nav>

      {/* ── Hero / profile section ── */}
      <main className="page-wrapper" id="about">
        <section className="profile-section">
          <div className="profile-picture-wrapper">
          <img className="profile-picture" src={PROFILE_IMAGE_SRC} alt={PROFILE_IMAGE_ALT} />
        </div>
          <div className="profile-text">
            <h1>{OWNER_NAME}</h1>
            <p className="keywords-tagline">{OWNER_KEYWORDS}</p>
            <p className="bio">{OWNER_BIO}</p>
            <p className="email">{OWNER_EMAIL}</p>
            <div className="link-buttons">
              <LinkButton label="Resume" href={RESUME_PATH}  icon={<ResumeIcon />}   newTab />
              <LinkButton label=""       href={LINKEDIN_URL} icon={<LinkedInIcon />} newTab />
              <LinkButton label="" href={GITHUB_URL}   icon={<GitHubIcon />}   newTab />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App
