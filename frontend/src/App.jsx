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

  return (
    <div className="app-shell">
      <div className="topbar-announcement">
        🚀 Ready to transform your cloud strategy? <a href="#contact">Schedule a discovery call</a>
      </div>
      <nav className="nav">
        <div className="logo">
          <div className="logo-icon">C</div>
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
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </div>
          <div className="nav-search">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="nav-actions">
          <button className="nav-notification">
            🔔
            <span className="nav-notification-badge">2</span>
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
      <main className="page">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-content">
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
