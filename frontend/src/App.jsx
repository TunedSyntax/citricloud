import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";

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
              to="/news"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              News
            </NavLink>
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
            <span className="material-symbols-outlined">search</span>
          </button>
          <button
            className="nav-icon-button nav-theme-toggle"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined">
              {theme === "light" ? 'dark_mode' : 'light_mode'}
            </span>
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
                to="/news"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMobileMenuOpen(false)}
              >
                News
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

// News data shared between News list and detail pages
const newsCategories = [
  "All",
  "Product Updates",
  "Engineering",
  "Company News",
  "Cloud Strategy",
  "Tutorials",
  "Case Studies"
];

const newsAllTags = [
  "Kubernetes",
  "AWS",
  "GCP",
  "Azure",
  "DevOps",
  "Security",
  "CI/CD",
  "Monitoring",
  "Cost Optimization",
  "Infrastructure",
  "Containers",
  "Serverless",
  "Migration",
  "Compliance",
  "Best Practices"
];

const newsArticles = [
    {
      id: 1,
      title: "Introducing Citricloud Platform 2.0: Next-Generation Cloud Orchestration",
      excerpt: "We're excited to announce Platform 2.0 with enhanced security features, multi-cloud support, and intelligent cost optimization. Discover what's new and how it can accelerate your cloud journey.",
      category: "Product Updates",
      tags: ["Kubernetes", "AWS", "GCP", "Azure"],
      date: "2026-02-10",
      readTime: "5 min",
      author: "Engineering Team",
      image: "product-update",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Building Resilient Kubernetes Clusters: Lessons from Production",
      excerpt: "Our engineering team shares hard-won insights from managing hundreds of production Kubernetes clusters across multiple cloud providers. Learn about disaster recovery, high availability, and automated failover strategies.",
      category: "Engineering",
      tags: ["Kubernetes", "DevOps", "Best Practices"],
      date: "2026-02-08",
      readTime: "8 min",
      author: "Sarah Chen",
      image: "kubernetes",
      imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1920&q=80",
      featured: true
    },
    {
      id: 3,
      title: "How We Reduced Cloud Costs by 40% Without Sacrificing Performance",
      excerpt: "A deep dive into our cost optimization framework that helped multiple enterprises dramatically reduce their cloud spend while maintaining—and in some cases improving—application performance.",
      category: "Case Studies",
      tags: ["Cost Optimization", "AWS", "Best Practices"],
      date: "2026-02-05",
      readTime: "10 min",
      author: "Michael Torres",
      image: "cost-optimization",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
      featured: true
    },
    {
      id: 4,
      title: "Citricloud Achieves SOC 2 Type II Certification",
      excerpt: "We're proud to announce that Citricloud has achieved SOC 2 Type II certification, demonstrating our commitment to security, availability, and confidentiality for enterprise customers.",
      category: "Company News",
      tags: ["Security", "Compliance"],
      date: "2026-02-03",
      readTime: "3 min",
      author: "Leadership Team",
      image: "compliance",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
    },
    {
      id: 5,
      title: "Zero-Downtime Database Migration: A Step-by-Step Guide",
      excerpt: "Migrating production databases can be nerve-wracking. This comprehensive guide walks through our battle-tested approach to zero-downtime migrations with real-world examples and code samples.",
      category: "Tutorials",
      tags: ["Migration", "DevOps", "Best Practices"],
      date: "2026-01-30",
      readTime: "12 min",
      author: "David Park",
      image: "migration",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80"
    },
    {
      id: 6,
      title: "Multi-Cloud Strategy: When and Why You Should Consider It",
      excerpt: "Multi-cloud isn't just vendor diversification—it's about leveraging the best capabilities of each provider. We explore when multi-cloud makes sense and how to avoid common pitfalls.",
      category: "Cloud Strategy",
      tags: ["AWS", "GCP", "Azure", "Infrastructure"],
      date: "2026-01-28",
      readTime: "7 min",
      author: "Rachel Kim",
      image: "multi-cloud",
      imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&q=80"
    },
    {
      id: 7,
      title: "Observability Best Practices: Metrics, Logs, and Traces",
      excerpt: "Comprehensive observability is crucial for maintaining reliable systems. Learn how to implement effective monitoring strategies using modern observability tools and practices.",
      category: "Tutorials",
      tags: ["Monitoring", "DevOps", "Best Practices"],
      date: "2026-01-25",
      readTime: "9 min",
      author: "Alex Johnson",
      image: "observability",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80"
    },
    {
      id: 8,
      title: "Securing Your CI/CD Pipeline: Essential Security Practices",
      excerpt: "CI/CD pipelines are critical infrastructure that require robust security measures. This guide covers authentication, secrets management, supply chain security, and more.",
      category: "Engineering",
      tags: ["CI/CD", "Security", "DevOps"],
      date: "2026-01-22",
      readTime: "11 min",
      author: "Emily Rodriguez",
      image: "security",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80"
    },
    {
      id: 9,
      title: "From Monolith to Microservices: A Fortune 500 Transformation",
      excerpt: "A detailed case study of how we helped a Fortune 500 company migrate from a legacy monolithic architecture to a modern microservices-based platform running on Kubernetes.",
      category: "Case Studies",
      tags: ["Kubernetes", "Migration", "Containers"],
      date: "2026-01-20",
      readTime: "15 min",
      author: "Technical Team",
      image: "microservices",
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=1920&q=80"
    },
    {
      id: 10,
      title: "Serverless at Scale: Real-World Performance Insights",
      excerpt: "Serverless computing has matured significantly. We share performance benchmarks, cost analysis, and architectural patterns from running serverless workloads at enterprise scale.",
      category: "Engineering",
      tags: ["Serverless", "AWS", "Performance"],
      date: "2026-01-18",
      readTime: "8 min",
      author: "James Wilson",
      image: "serverless",
      imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80"
    },
    {
      id: 11,
      title: "Infrastructure as Code: Terraform vs. Pulumi vs. CDK",
      excerpt: "An in-depth comparison of popular Infrastructure as Code tools. We evaluate developer experience, ecosystem maturity, and real-world use cases to help you choose the right tool.",
      category: "Tutorials",
      tags: ["Infrastructure", "DevOps", "Best Practices"],
      date: "2026-01-15",
      readTime: "10 min",
      author: "Maria Garcia",
      image: "iac",
      imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1920&q=80"
    },
    {
      id: 12,
      title: "Citricloud Expands European Presence with New Amsterdam Office",
      excerpt: "To better serve our growing European customer base, we're opening a new office in Amsterdam. This expansion reinforces our commitment to providing local support and expertise.",
      category: "Company News",
      tags: ["Infrastructure"],
      date: "2026-01-12",
      readTime: "4 min",
      author: "Leadership Team",
      image: "expansion",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
    }
  ];

function News() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);
  const articlesPerPage = 9;

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1); // Reset to first page when filters change
  };

  const filteredArticles = useMemo(() => {
    let filtered = newsArticles;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(article =>
        selectedTags.some(tag => article.tags.includes(tag))
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort articles
    if (sortBy === "latest") {
      filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
      filtered = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "popular") {
      // In a real app, this would sort by view count or engagement
      filtered = [...filtered];
    }

    return filtered;
  }, [selectedCategory, selectedTags, searchQuery, sortBy]);

  const featuredArticles = newsArticles.filter(article => article.featured);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedTags([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Carousel auto-advance
  useEffect(() => {
    if (featuredArticles.length === 0 || !isCarouselPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [featuredArticles.length, isCarouselPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleCarouselPlaying = () => {
    setIsCarouselPlaying(prev => !prev);
  };

  return (
    <div className="stack">
      {/* Hero Carousel Section */}
      <section className="news-hero-carousel">
        <div className="news-carousel-container">
          {featuredArticles.map((article, index) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className={`news-carousel-slide ${index === currentSlide ? 'active' : ''} ${index === (currentSlide - 1 + featuredArticles.length) % featuredArticles.length ? 'prev' : ''}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div 
                className="news-carousel-background" 
                style={{
                  backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="news-carousel-overlay"></div>
              </div>
              <div className="news-carousel-content">
                <h1 className="news-carousel-title">{article.title}</h1>
              </div>
            </Link>
          ))}

          {/* Carousel Controls */}
          <div className="news-carousel-controls">
            <button
              className="news-carousel-nav news-carousel-prev"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              className="news-carousel-nav news-carousel-next"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {/* Play/Pause Button */}
          <button
            className="news-carousel-playpause"
            onClick={toggleCarouselPlaying}
            aria-label={isCarouselPlaying ? "Pause carousel" : "Play carousel"}
          >
            <span className="material-symbols-outlined">
              {isCarouselPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Carousel Indicators */}
          <div className="news-carousel-indicators">
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                className={`news-carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section soft">
        <div className="news-filters-container">
          {/* Search */}
          <div className="news-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 20.3l-4.3-4.3a7.5 7.5 0 10-1.4 1.4L19.6 21 21 20.3zM4.5 10.5a6 6 0 1112 0 6 6 0 01-12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            {searchQuery && (
              <button
                className="news-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="news-sort">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="news-categories">
          {newsCategories.map(category => (
            <button
              key={category}
              className={`news-category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tags */}
        <div className="news-tags-section">
          <div className="news-tags-header">
            <h3>Filter by Tags</h3>
            {selectedTags.length > 0 && (
              <button
                className="news-clear-tags"
                onClick={() => setSelectedTags([])}
              >
                Clear tags ({selectedTags.length})
              </button>
            )}
          </div>
          <div className="news-tags-cloud">
            {newsAllTags.map(tag => (
              <button
                key={tag}
                className={`news-tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
                {selectedTags.includes(tag) && <span className="news-tag-check">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {(selectedCategory !== "All" || selectedTags.length > 0 || searchQuery) && (
          <div className="news-active-filters">
            <span className="news-filters-title">Active filters:</span>
            {selectedCategory !== "All" && (
              <span className="news-filter-chip">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory("All")}>✕</button>
              </span>
            )}
            {selectedTags.map(tag => (
              <span key={tag} className="news-filter-chip">
                {tag}
                <button onClick={() => toggleTag(tag)}>✕</button>
              </span>
            ))}
            {searchQuery && (
              <span className="news-filter-chip">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery("")}>✕</button>
              </span>
            )}
            <button className="news-clear-all" onClick={clearFilters}>
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Articles Grid */}
      <section className="section">
        <div className="news-results-header">
          <h2>
            {filteredArticles.length === 0
              ? "No articles found"
              : `${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''}`}
          </h2>
        </div>

        {currentArticles.length > 0 ? (
          <>
            <div className="news-grid">
              {currentArticles.map((article) => (
                <Link key={article.id} to={`/news/${article.id}`} className="news-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="news-card-image">
                    {article.imageUrl ? (
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="news-card-img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="news-image-placeholder" data-type={article.image}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                      </div>
                    )}
                    <div className="news-category-badge">{article.category}</div>
                  </div>
                  <div className="news-card-content">
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className="news-meta">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{formatDate(article.date)}</span>
                      <span>•</span>
                      <span>{article.readTime} read</span>
                    </div>
                    <div className="news-tags">
                      {article.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="news-tag"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!selectedTags.includes(tag)) {
                              toggleTag(tag);
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="news-tag">+{article.tags.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="news-pagination">
                <button
                  className="news-pagination-button"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>
                <div className="news-pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`news-pagination-page ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  className="news-pagination-button"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="news-empty-state">
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '64px', height: '64px', opacity: 0.3 }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <h3>No articles match your filters</h3>
            <p>Try adjusting your search terms or clearing some filters to see more results.</p>
            <button className="primary" onClick={clearFilters}>
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Subscription */}
      <section className="section soft">
        <div className="news-newsletter">
          <div className="news-newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest cloud insights, product updates, and engineering best practices delivered to your inbox.</p>
          </div>
          <form className="news-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
            <button className="primary" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function NewsArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = newsArticles.find(a => a.id === parseInt(id));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!article) {
    return (
      <div className="stack">
        <section className="section">
          <div className="news-article-not-found">
            <h1>Article Not Found</h1>
            <p>The article you're looking for doesn't exist.</p>
            <button className="primary" onClick={() => navigate('/news')}>
              ← Back to News
            </button>
          </div>
        </section>
      </div>
    );
  }

  const relatedArticles = newsArticles
    .filter(a => 
      a.id !== article.id && 
      (a.category === article.category || a.tags.some(tag => article.tags.includes(tag)))
    )
    .slice(0, 3);

  return (
    <div className="stack">
      {/* Hero Section */}
      <section className="news-article-hero" style={{
        backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>        <div className="news-article-hero-overlay"></div>
        <div className="news-article-hero-content">
          <div className="news-article-category-badge">{article.category}</div>
          <h1>{article.title}</h1>
          <div className="news-article-meta">
            <span>{article.author}</span>
            <span>•</span>
            <span>{formatDate(article.date)}</span>
            <span>•</span>
            <span>{article.readTime} read</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section">
        <article className="news-article-content">
          <div className="news-article-excerpt">{article.excerpt}</div>
          
          <div className="news-article-body">
            <p>
              In today's rapidly evolving cloud landscape, organizations face unprecedented challenges 
              in managing their infrastructure efficiently while maintaining security and cost-effectiveness. 
              This article explores the latest developments and best practices in cloud engineering.
            </p>
            
            <h2>Key Highlights</h2>
            <p>
              Our team has been working tirelessly to deliver innovative solutions that address the most 
              pressing needs of modern cloud operations. Through extensive research and collaboration with 
              industry leaders, we've identified several critical areas for improvement.
            </p>
            
            <h3>Technical Implementation</h3>
            <p>
              The implementation of these new features required careful consideration of multiple factors, 
              including scalability, reliability, and user experience. Our engineering team has developed 
              a robust architecture that can handle enterprise-scale workloads while maintaining optimal performance.
            </p>
            
            <blockquote>
              "This represents a significant leap forward in cloud platform capabilities, enabling teams 
              to deploy and manage applications with unprecedented ease and efficiency."
            </blockquote>
            
            <h3>Benefits and Impact</h3>
            <p>
              Organizations adopting these new approaches have reported significant improvements in their 
              deployment velocity, system reliability, and overall operational efficiency. The automation 
              capabilities alone have reduced manual intervention by up to 70% in some cases.
            </p>
            
            <h2>Looking Forward</h2>
            <p>
              As we continue to innovate and expand our platform capabilities, we remain committed to 
              delivering solutions that empower development teams and accelerate digital transformation. 
              The future of cloud computing is bright, and we're excited to be at the forefront of this evolution.
            </p>
          </div>

          {/* Tags */}
          <div className="news-article-tags">
            {article.tags.map(tag => (
              <span key={tag} className="news-article-tag">{tag}</span>
            ))}
          </div>

          {/* Share */}
          <div className="news-article-share">
            <h3>Share this article</h3>
            <div className="news-article-share-buttons">
              <button className="share-button" aria-label="Share on Twitter">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button className="share-button" aria-label="Share on LinkedIn">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button className="share-button" aria-label="Copy link">
                <span className="material-symbols-outlined">link</span>
              </button>
            </div>
          </div>
        </article>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="section soft">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Related Articles</h2>
          <div className="news-related-grid">
            {relatedArticles.map(related => (
              <Link key={related.id} to={`/news/${related.id}`} className="news-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="news-card-image">
                  {related.imageUrl ? (
                    <img 
                      src={related.imageUrl} 
                      alt={related.title}
                      className="news-card-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="news-image-placeholder" data-type={related.image}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                    </div>
                  )}
                  <div className="news-category-badge">{related.category}</div>
                </div>
                <div className="news-card-content">
                  <h3>{related.title}</h3>
                  <p>{related.excerpt}</p>
                  <div className="news-meta">
                    <span>{related.author}</span>
                    <span>•</span>
                    <span>{formatDate(related.date)}</span>
                    <span>•</span>
                    <span>{related.readTime} read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
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
          path="/news"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <News />
            </Layout>
          }
        />
        <Route
          path="/news/:id"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <NewsArticle />
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
