import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";

// Determine API URL based on environment
const getApiUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:4000';
  }
  // For production (citricloud.com)
  return 'https://api.citricloud.com';
};

const API_URL = getApiUrl();

const highlights = [
  {
    title: "Compliance-ready delivery",
    body: "Secure release lanes, audit trails, and policy gates keep teams aligned."
  },
  {
    title: "Observability in minutes",
    body: "Unified metrics, traces, and logs with alerts that reflect your SLAs."
  },
  {
    title: "Elastic cost controls",
    body: "Right-size infrastructure with adaptive scaling and spend guardrails."
  },
  {
    title: "Global edge runtime",
    body: "Route workloads to the fastest region with automated failover."
  }
];

const services = [
  {
    name: "Cloud Strategy",
    detail: "Roadmaps, cloud operating models, and platform reference designs."
  },
  {
    name: "Platform Engineering",
    detail: "Golden paths, internal developer portals, and CI/CD automation."
  },
  {
    name: "Reliability",
    detail: "SLO definition, chaos testing, and incident management playbooks."
  }
];

const contactPoints = [
  "hello@citricloud.io",
  "+31 20 123 4567",
  "Herengracht 420, Amsterdam"
];

const apiRequest = async (path, options = {}) => {
  // If path is relative and doesn't start with http, prepend API_URL
  const url = path.startsWith("http") ? path : (API_URL + path);
  
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};

function Layout({ token, profile, onLogout, children }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("cc_theme") || "light");
  const [searchOpen, setSearchOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesMenuTimeout = useMemo(() => ({ current: null }), []);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", theme === "dark");
    document.body.classList.toggle("theme-light", theme === "light");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cc_theme", theme);
  }, [theme]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (servicesMenuTimeout.current) clearTimeout(servicesMenuTimeout.current);
    };
  }, [servicesMenuTimeout]);

  return (
    <div className="app-shell">
      <div className="topbar-announcement">
        <span>
          🚀 Ready to transform your cloud strategy? <a href="#contact">Schedule a discovery call</a>
        </span>
        <div className="topbar-links">
          <a href="#">Docs</a>
          <a href="#">Status</a>
        </div>
      </div>
      <nav className="nav">
        <div className="logo">
          <img 
            src={theme === "dark" 
              ? `${API_URL}/api/assets/logos/darkmode.svg` 
              : `${API_URL}/api/assets/logos/lightmode.svg`}
            alt="Citricloud Logo"
            className="logo-image"
            onError={(e) => {
              // Fallback to text logo if image fails
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="logo-icon" style={{display: 'none'}}>C</div>
        </div>
        <div className="nav-center">
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
            <div 
              className="nav-menu-item"
              onMouseEnter={() => {
                if (servicesMenuTimeout.current) clearTimeout(servicesMenuTimeout.current);
                setServicesMenuOpen(true);
              }}
              onMouseLeave={() => {
                servicesMenuTimeout.current = setTimeout(() => {
                  setServicesMenuOpen(false);
                }, 150);
              }}
            >
              <NavLink
                to="/services"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Services
                <svg className="nav-dropdown-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </NavLink>
              {servicesMenuOpen && (
                <div 
                  className="megamenu"
                  onMouseEnter={() => {
                    if (servicesMenuTimeout.current) clearTimeout(servicesMenuTimeout.current);
                  }}
                  onMouseLeave={() => setServicesMenuOpen(false)}
                >
                  <div className="megamenu-content">
                    <div className="megamenu-section">
                      <h3>Services</h3>
                      <ul>
                        <li><a href="#strategy">Cloud Strategy</a></li>
                        <li><a href="#platform">Platform Engineering</a></li>
                        <li><a href="#reliability">Reliability</a></li>
                      </ul>
                    </div>
                    <div className="megamenu-section">
                      <h3>More</h3>
                      <ul>
                        <li><NavLink to="/pricing">Pricing</NavLink></li>
                        <li><NavLink to="/resources">Resources</NavLink></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </div>
        </div>
        <div className="nav-actions">
          <button
            className="nav-icon-button nav-search-button"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 20.3l-4.3-4.3a7.5 7.5 0 10-1.4 1.4L19.6 21 21 20.3zM4.5 10.5a6 6 0 1112 0 6 6 0 01-12 0z" />
            </svg>
          </button>
          <button
            className="nav-icon-button nav-theme-toggle"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 14.5A8.5 8.5 0 119.5 3a7 7 0 0011.5 11.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4a1 1 0 011-1h0a1 1 0 010 2h0a1 1 0 01-1-1zm0 16a1 1 0 011 1h0a1 1 0 11-2 0h0a1 1 0 011-1zm8-8a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zm-16 0a1 1 0 01-1-1h0a1 1 0 112 0h0a1 1 0 01-1 1zm12.95-5.95a1 1 0 011.41 0h0a1 1 0 11-1.41 1.41h0a1 1 0 010-1.41zM5.64 18.36a1 1 0 010-1.41h0a1 1 0 111.41 1.41h0a1 1 0 01-1.41 0zM18.36 18.36a1 1 0 010-1.41h0a1 1 0 111.41 1.41h0a1 1 0 01-1.41 0zM5.64 5.64a1 1 0 011.41 0h0a1 1 0 11-1.41 1.41h0a1 1 0 010-1.41zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
              </svg>
            )}
          </button>
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              ) : (
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              )}
            </svg>
          </button>
          {token ? (
            <div className={`nav-profile ${profileMenuOpen ? "active" : ""}`}>
              <button 
                className="nav-profile-button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <div className="nav-profile-avatar">
                  {profile?.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <span>{profile?.email?.split("@")[0] || "User"}</span>
              </button>
              <div className="nav-profile-menu">
                <a href="#">📊 Dashboard</a>
                <a href="#">⚙️ Settings</a>
                <a href="#">🔔 Notifications</a>
                <div className="divider"></div>
                <a href="#">📚 Documentation</a>
                <a href="#">💬 Support</a>
                <div className="divider"></div>
                <button onClick={onLogout}>🚪 Log out</button>
              </div>
            </div>
          ) : (
            <NavLink className="primary" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="logo">
                <img 
                  src={theme === "dark" 
                    ? `${API_URL}/api/assets/logos/darkmode.svg` 
                    : `${API_URL}/api/assets/logos/lightmode.svg`}
                  alt="Citricloud Logo"
                  className="logo-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="logo-icon" style={{display: 'none'}}>C</div>
              </div>
              <button
                className="mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
            <div className="mobile-menu-content">
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </NavLink>
              <div className="mobile-menu-section">
                <div className="mobile-menu-section-title">Services</div>
                <div className="mobile-menu-section-content">
                  <a href="#strategy" onClick={() => setMobileMenuOpen(false)}>Cloud Strategy</a>
                  <a href="#platform" onClick={() => setMobileMenuOpen(false)}>Platform Engineering</a>
                  <a href="#reliability" onClick={() => setMobileMenuOpen(false)}>Reliability</a>
                </div>
              </div>
              <NavLink
                to="/pricing"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </NavLink>
              <NavLink
                to="/resources"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
              {token ? (
                <>
                  <div className="mobile-menu-divider"></div>
                  <div className="mobile-menu-user">
                    <div className="nav-profile-avatar">
                      {profile?.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span>{profile?.email?.split("@")[0] || "User"}</span>
                  </div>
                  <a href="#">📊 Dashboard</a>
                  <a href="#">⚙️ Settings</a>
                  <a href="#">🔔 Notifications</a>
                  <div className="mobile-menu-divider"></div>
                  <a href="#">📚 Documentation</a>
                  <a href="#">💬 Support</a>
                  <div className="mobile-menu-divider"></div>
                  <button onClick={() => { onLogout(); setMobileMenuOpen(false); }}>🚪 Log out</button>
                </>
              ) : (
                <>
                  <div className="mobile-menu-divider"></div>
                  <NavLink className="mobile-menu-login" to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {searchOpen ? (
        <div className="search-modal" onClick={() => setSearchOpen(false)}>
          <div className="search-modal-panel" onClick={(event) => event.stopPropagation()}>
            <div className="search-modal-header">
              <h3>Search Citricloud</h3>
              <button
                className="nav-icon-button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                ✕
              </button>
            </div>
            <input
              type="text"
              placeholder="Search services, docs, and updates..."
              autoFocus
            />
            <div className="search-modal-hint">Press Esc or click outside to close.</div>
          </div>
        </div>
      ) : null}
      <main className="page">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <img 
                src={`${API_URL}/api/assets/icons/icon.svg?v=1`}
                alt="CITRICLOUD Icon"
                className="footer-icon"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div>
              <strong>CITRICLOUD</strong>
              <p>Cloud delivery clarity for product teams navigating scale and security.</p>
            </div>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Platform</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Cloud Strategy</a></li>
              <li><a href="#">Platform Engineering</a></li>
              <li><a href="#">Reliability</a></li>
              <li><a href="#">Consulting</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <strong>Citricloud</strong> • Founded 2026 • Delivering cloud clarity for product teams
          </div>
          <div className="footer-socials">
            <a href="#" title="Twitter">𝕏</a>
            <a href="#" title="LinkedIn">in</a>
            <a href="#" title="GitHub">⚙</a>
            <a href="#" title="Email">✉</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="badge">Enterprise Cloud Studio</div>
            <h1>Confident cloud delivery for ambitious teams.</h1>
            <p>
              Citricloud helps product organizations design platforms that scale, stay compliant, and delight developers. From architecture to operations, we partner with you every step of the way.
            </p>
            <div className="cta-row">
              <button className="primary">Plan a discovery call</button>
              <button className="ghost">Download overview</button>
            </div>
            <div className="hero-note">Trusted by 50+ global enterprises to reduce risk and accelerate delivery.</div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">Now onboarding</span>
              <span className="hero-pill outline">Q2 2026</span>
            </div>
            <div className="hero-metrics">
              <div className="hero-stat">
                <div className="hero-stat-value">28%</div>
                <div className="hero-stat-label">Cost reduction</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">3.4x</div>
                <div className="hero-stat-label">Release speed</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">99.95%</div>
                <div className="hero-stat-label">Uptime target</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">6 wks</div>
                <div className="hero-stat-label">Launch runway</div>
              </div>
            </div>
            <div className="hero-panel-footer">Launch readiness with security and observability built-in.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        {highlights.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="split">
        <div>
          <h2>Platform clarity from day one</h2>
          <p>
            From architecture workshops to enablement, we turn complex cloud decisions into actionable rollout plans. Our methodology combines industry best practices with your organizational goals.
          </p>
          <p style={{marginTop: '16px', opacity: 0.8}}>
            We helped a Fortune 500 fintech reduce their infrastructure costs by 34% while improving deployment frequency by 3.2x, all while maintaining 99.99% uptime. Your cloud transformation is unique—we treat it that way.
          </p>
        </div>
        <div className="panel">
          <div className="panel-title">Latest improvements</div>
          <ul>
            <li>Automation coverage: 94% (+3%)</li>
            <li>Deployments last month: 187 (+15%)</li>
            <li>Mean time to recover: 18 mins (-4)</li>
            <li>Security scan pass rate: 98.2% (+1.2%)</li>
          </ul>
        </div>
      </section>

      <section className="section soft">
        <h2 style={{marginBottom: '24px'}}>Why teams choose Citricloud</h2>
        <div className="list">
          <article className="card" style={{textAlign: 'center'}}>
            <h3>🚀 Hands-on expertise</h3>
            <p>Our team has shipped over 10,000 deployments across 200+ organizations. We know what works.</p>
          </article>
          <article className="card" style={{textAlign: 'center'}}>
            <h3>🔒 Security first</h3>
            <p>Built for regulated industries. SOC2, ISO27001, and compliance reviews are standard in our approach.</p>
          </article>
          <article className="card" style={{textAlign: 'center'}}>
            <h3>📊 Data-driven</h3>
            <p>Every decision backed by metrics. We implement observability from day one, not as an afterthought.</p>
          </article>
          <article className="card" style={{textAlign: 'center'}}>
            <h3>🎯 Transfer knowledge</h3>
            <p>We empower your teams. Our goal is to leave you stronger, more autonomous, and more confident.</p>
          </article>
        </div>
      </section>

      <section className="split" style={{justifyItems: 'start'}}>
        <div>
          <h2>Recent success stories</h2>
          <p>
            We recently helped a Series B SaaS company design a new multi-tenant platform architecture that reduced their time-to-market for new enterprise customers from 12 weeks to 3 weeks, while improving stability across 99.95% of requests.
          </p>
          <p style={{marginTop: '16px', opacity: 0.8}}>
            Another engagement with a healthcare provider involved migrating a monolithic legacy system to a modern event-driven architecture, improving regulatory compliance posture and reducing operational overhead by 40%.
          </p>
        </div>
        <div className="panel">
          <div className="panel-title">Engagement types</div>
          <ul>
            <li><strong>Strategy</strong> — Architecture workshops</li>
            <li><strong>Implementation</strong> — Hands-on platform launch</li>
            <li><strong>Optimization</strong> — Cost & reliability audits</li>
            <li><strong>Training</strong> — Team enablement &amp; handoff</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function About() {
  return (
    <div className="stack">
      <section className="hero">
        <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
          <h1>About Citricloud</h1>
          <p style={{fontSize: '1.2rem', lineHeight: 1.8, maxWidth: 'none'}}>
            We're a boutique cloud engineering studio helping teams modernize and operate secure, efficient platforms. Our approach combines deep technical expertise with organizational change management to ensure lasting transformation.
          </p>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>Our Mission</h2>
          <p>
            Enable product teams to ship confidently with predictable costs. We believe cloud platforms should be enablers, not barriers—they should accelerate innovation while maintaining security, reliability, and cost efficiency.
          </p>
          <p style={{marginTop: '16px', opacity: 0.8}}>
            Since 2018, we've worked with Fortune 500 enterprises, Series A-D startups, and everything in between. We've learned that successful cloud transformation requires both technical excellence and organizational alignment.
          </p>
        </div>
        <div className="panel">
          <div className="panel-title">By the numbers</div>
          <ul>
            <li><strong>50+</strong> organizations served</li>
            <li><strong>10,000+</strong> deployments facilitated</li>
            <li><strong>6+ years</strong> in cloud transformation</li>
            <li><strong>99.95%</strong> avg uptime for clients</li>
          </ul>
        </div>
      </section>

      <section className="section soft">
        <h2 style={{marginBottom: '24px'}}>Our Values</h2>
        <div className="list">
          <article className="card">
            <h3>Pragmatism</h3>
            <p>We focus on what works in reality, not theoretical perfection. Every recommendation is grounded in practical experience and your specific constraints.</p>
          </article>
          <article className="card">
            <h3>Transparency</h3>
            <p>No hidden agendas. We'll tell you what we see, recommend what's best for your business, and explain the tradeoffs clearly.</p>
          </article>
          <article className="card">
            <h3>Collaboration</h3>
            <p>We work alongside your teams, not above them. Our success is measured by how well your organization owns the outcomes.</p>
          </article>
          <article className="card">
            <h3>Excellence</h3>
            <p>High standards in everything we do—from code quality to documentation to delivery timelines. Your reputation is our reputation.</p>
          </article>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>Our Approach</h2>
          <h3>Assess</h3>
          <p>
            We start with listening. Understanding your current state, business objectives, technical constraints, and team capabilities shapes everything that follows.
          </p>
          <h3 style={{marginTop: '20px'}}>Design</h3>
          <p>
            Working collaboratively, we design solutions that are secure, scalable, and aligned with your organizational culture. Architecture without buy-in is just a nice document.
          </p>
          <h3 style={{marginTop: '20px'}}>Execute</h3>
          <p>
            We ship. Using proven practices and automation-first mindset, we reduce risk while maintaining velocity. Your team gets hands-on experience throughout.
          </p>
          <h3 style={{marginTop: '20px'}}>Empower</h3>
          <p>
            Our goal is to leave you stronger. Knowledge transfer, runbook creation, and team training ensure sustainable operations long after we're gone.
          </p>
        </div>
        <div className="panel">
          <div className="panel-title">Our Team</div>
          <p style={{marginBottom: '12px', fontSize: '0.95rem'}}>
            Citricloud is led by cloud architects and platform engineers with 15+ years of collective experience across AWS, GCP, Kubernetes, and enterprise infrastructure.
          </p>
          <p style={{fontSize: '0.95rem', opacity: 0.8}}>
            We've built teams at scale, managed critical infrastructure, and led successful migrations. We know the challenges you're facing because we've faced them too.
          </p>
        </div>
      </section>
    </div>
  );
}

function Services() {
  return (
    <div className="stack">
      <section className="hero">
        <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
          <h1>Services</h1>
          <p style={{fontSize: '1.2rem', lineHeight: 1.8, maxWidth: 'none'}}>
            Flexible engagement models designed to support every phase of your cloud transformation—from initial strategy through sustained optimization.
          </p>
        </div>
      </section>

      <section className="grid">
        {services.map((service) => (
          <article key={service.name} className="card">
            <h3>{service.name}</h3>
            <p>{service.detail}</p>
          </article>
        ))}
      </section>

      <section className="section soft">
        <h2 style={{marginBottom: '24px', textAlign: 'center'}}>How we work</h2>
        <div className="split" style={{gridTemplateColumns: '1fr 1fr', gap: '32px'}}>
          <div>
            <h3>Discovery (Weeks 1-2)</h3>
            <p>
              We deeply understand your current architecture, business constraints, team capacity, and strategic objectives. This phase includes architecture reviews, security assessments, and stakeholder interviews.
            </p>
            <ul style={{marginTop: '12px'}}>
              <li>Current state assessment</li>
              <li>Security &amp; compliance review</li>
              <li>Stakeholder alignment workshops</li>
              <li>Opportunity identification</li>
            </ul>
          </div>
          <div>
            <h3>Design (Weeks 2-4)</h3>
            <p>
              Collaborative architecture design sessions with your engineering leadership. We create detailed implementation roadmaps, technology recommendations, and risk mitigation strategies.
            </p>
            <ul style={{marginTop: '12px'}}>
              <li>Architecture design workshops</li>
              <li>Technology recommendations</li>
              <li>Implementation roadmap</li>
              <li>Documentation &amp; runbooks</li>
            </ul>
          </div>
          <div>
            <h3>Implementation (Weeks 4-12)</h3>
            <p>
              Hands-on platform development and infrastructure work. Your team works alongside us, learning practices and patterns as we build. Code reviews, pair programming, and knowledge sharing throughout.
            </p>
            <ul style={{marginTop: '12px'}}>
              <li>Hands-on development</li>
              <li>Infrastructure provisioning</li>
              <li>CI/CD pipeline setup</li>
              <li>Security &amp; monitoring integration</li>
            </ul>
          </div>
          <div>
            <h3>Optimization (Ongoing)</h3>
            <p>
              Continuous improvement of cost, reliability, and developer experience. Post-engagement support, monitoring, and optimization recommendations based on real operational metrics.
            </p>
            <ul style={{marginTop: '12px'}}>
              <li>Cost optimization audits</li>
              <li>Reliability reviews</li>
              <li>Performance tuning</li>
              <li>Team enablement &amp; training</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>Engagement Models</h2>
          <h3>Advisory</h3>
          <p>
            Executive advisors reviewing strategic cloud investments. Ideal for CTO/VP Engineering alignment on platform decisions. 10-20 hours/month.
          </p>
          <h3 style={{marginTop: '20px'}}>Project-based</h3>
          <p>
            Dedicated team for 8-12 weeks focused on a specific initiative: platform launch, migration, or optimization. Full-time engagement with your engineering organization.
          </p>
          <h3 style={{marginTop: '20px'}}>Staffing</h3>
          <p>
            Dedicated engineer joins your team long-term to implement architectural improvements and build new platform capabilities. Integrated into your org structure and processes.
          </p>
        </div>
        <div className="panel">
          <div className="panel-title">Service Stack</div>
          <ul>
            <li>Kubernetes &amp; container orchestration</li>
            <li>Multi-cloud (AWS, GCP, Azure)</li>
            <li>CI/CD &amp; infrastructure automation</li>
            <li>Observability &amp; monitoring</li>
            <li>Security &amp; compliance tooling</li>
            <li>Cost optimization &amp; governance</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function Contact() {
  return (
    <div className="stack">
      <section className="hero">
        <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
          <h1>Get in touch</h1>
          <p style={{fontSize: '1.2rem', lineHeight: 1.8, maxWidth: 'none'}}>
            Whether you're exploring cloud transformation, evaluating your current platform, or ready to execute a major initiative, we'd love to talk. Let's start a conversation about your goals.
          </p>
        </div>
      </section>

      <section className="split">
        <div className="panel light">
          <div className="panel-title">Direct contact</div>
          <ul style={{listStyle: 'none', padding: 0}}>
            {contactPoints.map((item) => (
              <li key={item} style={{marginBottom: '12px'}}>{item}</li>
            ))}
          </ul>
          <div style={{marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e0f2fe'}}>
            <p style={{fontSize: '0.9rem', margin: 0, marginBottom: '12px'}}>
              <strong>Typical response time:</strong> Within 24 hours
            </p>
            <p style={{fontSize: '0.9rem', margin: 0}}>
              <strong>Timezone:</strong> CET (Amsterdam)
            </p>
          </div>
        </div>
        <form className="form-card" onSubmit={(event) => event.preventDefault()}>
          <label>
            Full name *
            <input type="text" placeholder="Your name" required />
          </label>
          <label>
            Email *
            <input type="email" placeholder="you@company.com" required />
          </label>
          <label>
            Company
            <input type="text" placeholder="Company name" />
          </label>
          <label>
            Role
            <input type="text" placeholder="Your role (e.g., VP Engineering)" />
          </label>
          <label>
            How can we help? *
            <textarea rows="5" placeholder="Tell us about your goals, current challenges, and timeline." required />
          </label>
          <button className="primary" type="submit">
            Send message
          </button>
          <p style={{fontSize: '0.85rem', color: '#64748b', margin: '12px 0 0'}}>
            We respect your privacy. Read our <a href="#" style={{color: '#0ea5e9', textDecoration: 'underline'}}>privacy policy</a>.
          </p>
        </form>
      </section>

      <section className="section soft">
        <h2 style={{marginBottom: '24px', textAlign: 'center'}}>Common questions</h2>
        <div className="list">
          <article className="card">
            <h3>What's the typical engagement cost?</h3>
            <p>
              Project-based engagements typically range from $25k to $150k+ depending on scope, duration, and team size. Advisory relationships start at $3k/month. We'll provide a clear estimate after our initial discovery conversation.
            </p>
          </article>
          <article className="card">
            <h3>How long does a transformation take?</h3>
            <p>
              Most platform transformation projects run 8-16 weeks. Initial discovery is 1-2 weeks, design 2-4 weeks, implementation 4-12 weeks. The timeline depends on scope and your team's availability to collaborate.
            </p>
          </article>
          <article className="card">
            <h3>Do you work with non-technical teams?</h3>
            <p>
              Yes. We're experienced in stakeholder alignment, change management, and executive communication. We can translate technical decisions into business impact for leadership teams.
            </p>
          </article>
          <article className="card">
            <h3>Can you help with specific cloud providers?</h3>
            <p>
              We're platform-agnostic. Our experience spans AWS, Google Cloud, Azure, and multi-cloud architectures. We help you choose the right platform(s) for your use cases and constraints.
            </p>
          </article>
          <article className="card">
            <h3>What if we already have a platform?</h3>
            <p>
              Perfect. We specialize in optimizing existing platforms—reducing costs, improving reliability, modernizing architectures, and enabling teams better. Platform audits are often our first engagement.
            </p>
          </article>
          <article className="card">
            <h3>Do you offer support after the engagement?</h3>
            <p>
              Yes. We offer post-engagement support packages, retainer relationships for ongoing optimization, and staffing models where our engineers join your team long-term.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

function Login({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const actionLabel = useMemo(
    () => (mode === "login" ? "Sign in" : "Create account"),
    [mode]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const path = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const data = await apiRequest(path, {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      if (data?.access_token) {
        localStorage.setItem("cc_token", data.access_token);
        setStatus("Signed in successfully.");
        onAuth();
        navigate("/");
      }
    } catch (error) {
      setStatus(error.message || "Unable to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h2>{actionLabel}</h2>
        <p className="muted">Use your business email to access the portal.</p>
        <form onSubmit={handleSubmit} className="form-stack">
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
            />
          </label>
          <button className="primary" type="submit" disabled={loading}>
            {loading ? "Working..." : actionLabel}
          </button>
          {status ? <div className="status">{status}</div> : null}
        </form>
        <button
          className="ghost link"
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login"
            ? "Need an account? Register"
            : "Already registered? Sign in"}
        </button>
      </div>
    </div>
  );
}

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("cc_token"));
  const [profile, setProfile] = useState(null);

  const refreshProfile = async (activeToken) => {
    if (!activeToken) {
      setProfile(null);
      return;
    }

    try {
      const data = await apiRequest("/api/auth/me", {
        token: activeToken
      });
      setProfile(data.user);
    } catch {
      localStorage.removeItem("cc_token");
      setToken(null);
      setProfile(null);
    }
  };

  useEffect(() => {
    refreshProfile(token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("cc_token");
    setToken(localStorage.getItem("cc_token"));
    setProfile(null);
  };

  const handleAuth = () => {
    const stored = localStorage.getItem("cc_token");
    setToken(stored);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <About />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Services />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Login onAuth={handleAuth} />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
