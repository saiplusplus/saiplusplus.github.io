import './AboutMe.css';

// ============================================================
// ABOUT ME CONTENT — edit this section
// ============================================================
const TLDR_BULLETS: React.ReactNode[] = [
  'My favorite thing to do is spend time with my younger brother!',
  'I am a Tamil guy, born in Trichy + second hometown in Perundurai, but grew up in Bellevue, WA',
  'After work you\'ll find me doing housework, helping bro with homework, teaching Tamil, watching YouTube, cooking, origami, doing random sidequests, dropping bangers, exploring nature, trying out something new',
  <>Outside of school I am VP of Marketing for  <a href="https://ihouse.gatech.edu" target="_blank" rel="noopener noreferrer" className="am-inline-link">I-House</a>, a living learning community that is 1/2 Tech students with and 1/2 exchange students. Mind-blowing experience, make friends from all over the world, learn so much about different cultures and get to share my own. Host events, do a unique sort of diplomacy, and have a lot of fun. We really are not that different from one another across borders...</>,
  'My lifelong dream has been to make comedy fims, I want to make people laugh on tough days',
  <>Mostly <a href="https://open.spotify.com/playlist/0MK9Bz1O2sdsRZscYEwgwq?si=2b1a52014af84843" target="_blank" rel="noopener noreferrer" className="am-inline-link">listen</a> to deeply romantic Tamil/Indian songs, but every now and then will get into a phase of something else. Currently in my Arab-pop phase (love Amr Diab!!)</>,
  'Not very good at photography but do take a lot of pictures just to capture the moment, end up gang leader most of the times',
  'Quick to learn new things, dive deep when I do, fan of Andy Weir books, looking to improve a bit each day',
  'This tl;dr needs a tl;dr actually'
];
// ============================================================

interface AboutMeProps {
  onGoExperience: () => void;
  onGoHome: () => void;
  blogUrl: string;
}

export default function AboutMe({ onGoExperience, onGoHome, blogUrl }: AboutMeProps) {
  return (
    <div className="am-page">
      {/* ── Navbar ── */}
      <nav className="navbar">
        <ul className="navbar--items">
          <li>
            <a className="navbar--content navbar--content--active" href="#about">
              About Me
            </a>
          </li>
          <li>
            <a className="navbar--content" href="#experience" onClick={(e) => { e.preventDefault(); onGoExperience(); }}>
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

      {/* Back button */}
      <button className="we-back am-back" onClick={onGoHome} aria-label="Go back">
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

      {/* ── Page title ── */}
      <h1 className="am-title">About Me</h1>

      <div className="am-content">
        {/* ── TLDR ── */}
        <section className="am-section am-tldr-section">
          <h2 className="am-section-title">
            <span className="am-section-title-label">TL;DR</span>
          </h2>
          <ul className="am-tldr-list">
            {TLDR_BULLETS.map((bullet, i) => (
              <li key={i} className="am-tldr-item">
                <span className="am-tldr-dot" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
