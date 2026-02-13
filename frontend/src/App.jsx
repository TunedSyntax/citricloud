import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";

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
  const response = await fetch(path, {
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

  useEffect(() => {
    document.body.classList.toggle("theme-dark", theme === "dark");
    document.body.classList.toggle("theme-light", theme === "light");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cc_theme", theme);
  }, [theme]);

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
              ? "http://localhost:4000/api/assets/logos/darkmode.svg" 
              : "http://localhost:4000/api/assets/logos/lightmode.svg"}
            alt="Citricloud Logo"
            className="logo-image"
            onError={(e) => {
              // Fallback to text logo if image fails
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="logo-icon" style={{display: 'none'}}>C</div>
          Citricloud
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
              onMouseEnter={() => setServicesMenuOpen(true)}
              onMouseLeave={() => setServicesMenuOpen(false)}
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
                <div className="megamenu">
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
                src={theme === "dark" 
                  ? "http://localhost:4000/api/assets/logos/darkmode.svg" 
                  : "http://localhost:4000/api/assets/logos/lightmode.svg"}
                alt="Citricloud"
                className="footer-logo-image"
                onError={(e) => {
                  // Fallback to text logo if image fails
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <span style={{display: 'none'}}>C</span>
            </div>
            <div>
              <strong>Citricloud</strong>
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
              Citricloud helps product organizations design platforms that scale, stay
              compliant, and delight developers.
            </p>
            <div className="cta-row">
              <button className="primary">Plan a discovery call</button>
              <button className="ghost">Download overview</button>
            </div>
            <div className="hero-note">Trusted by global product orgs to reduce risk and move faster.</div>
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
            From architecture workshops to enablement, we turn complex cloud
            decisions into actionable rollout plans.
          </p>
        </div>
        <div className="panel">
          <div className="panel-title">Current signal</div>
          <ul>
            <li>Automation coverage: 91%</li>
            <li>Deployments last week: 48</li>
            <li>Mean time to recover: 22 minutes</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function About() {
  return (
    <div className="stack">
      <section className="section">
        <h2>About Citricloud</h2>
        <p>
          We are a boutique cloud engineering studio helping teams modernize and
          operate secure platforms. Our specialists align developers, security,
          and product leaders around practical delivery plans.
        </p>
      </section>
      <section className="section soft">
        <div className="list">
          <div>
            <h3>Mission</h3>
            <p>Enable teams to ship confidently with predictable cloud costs.</p>
          </div>
          <div>
            <h3>Approach</h3>
            <p>Co-create, automate, and transfer ownership to your teams.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Services() {
  return (
    <div className="stack">
      <section className="section">
        <h2>Services</h2>
        <p>
          Flexible engagement models to support platform design, launch, and
          operational maturity.
        </p>
      </section>
      <section className="grid">
        {services.map((service) => (
          <article key={service.name} className="card">
            <h3>{service.name}</h3>
            <p>{service.detail}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function Contact() {
  return (
    <div className="stack">
      <section className="section">
        <h2>Contact</h2>
        <p>Schedule a consult or ask about our platform assessment sprint.</p>
      </section>
      <section className="split">
        <div className="panel light">
          <div className="panel-title">Reach us</div>
          <ul>
            {contactPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <form className="form-card" onSubmit={(event) => event.preventDefault()}>
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@company.com" />
          </label>
          <label>
            Message
            <textarea rows="4" placeholder="Tell us about your goals." />
          </label>
          <button className="primary" type="submit">
            Send message
          </button>
        </form>
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
