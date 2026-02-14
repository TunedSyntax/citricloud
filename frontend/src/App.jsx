import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Contact from "./pages/Contact";
import Platform from "./pages/Platform";
import Pricing from "./pages/Pricing";
import Security from "./pages/Security";
import Status from "./pages/Status";
import CloudStrategy from "./pages/CloudStrategy";
import PlatformEngineering from "./pages/PlatformEngineering";
import Reliability from "./pages/Reliability";
import Consulting from "./pages/Consulting";
import Careers from "./pages/Careers";
import Partners from "./pages/Partners";
import Sitemap from "./pages/Sitemap";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Docs from "./pages/Docs";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Documentation from "./pages/Documentation";
import Support from "./pages/Support";
import Products from "./pages/Products";
import Solutions from "./pages/Solutions";

// Determine API URL based on environment
const getApiUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:4000';
  }
  // For production (citricloud.com)
  return 'https://api.citricloud.com';
};

const API_URL = getApiUrl();


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
          <NavLink to="/docs">Docs</NavLink>
          <NavLink to="/status">Status</NavLink>
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
                        <li><NavLink to="/cloud-strategy">Cloud Strategy</NavLink></li>
                        <li><NavLink to="/platform-engineering">Platform Engineering</NavLink></li>
                        <li><NavLink to="/reliability">Reliability</NavLink></li>
                        <li><NavLink to="/consulting">Consulting</NavLink></li>
                      </ul>
                    </div>
                    <div className="megamenu-section">
                      <h3>More</h3>
                      <ul>
                        <li><NavLink to="/pricing">Pricing</NavLink></li>
                        <li><NavLink to="/docs">Docs</NavLink></li>
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
                <span className="material-symbols-outlined">expand_more</span>
              </button>
              <div className="nav-profile-menu">
                <NavLink to="/dashboard" onClick={() => setProfileMenuOpen(false)}>
                  <span className="material-symbols-outlined">dashboard</span>
                  Dashboard
                </NavLink>
                <NavLink to="/settings" onClick={() => setProfileMenuOpen(false)}>
                  <span className="material-symbols-outlined">settings</span>
                  Settings
                </NavLink>
                <NavLink to="/notifications" onClick={() => setProfileMenuOpen(false)}>
                  <span className="material-symbols-outlined">notifications</span>
                  Notifications
                </NavLink>
                <div className="divider"></div>
                <NavLink to="/documentation" onClick={() => setProfileMenuOpen(false)}>
                  <span className="material-symbols-outlined">library_books</span>
                  Documentation
                </NavLink>
                <NavLink to="/support" onClick={() => setProfileMenuOpen(false)}>
                  <span className="material-symbols-outlined">support_agent</span>
                  Support
                </NavLink>
                <div className="divider"></div>
                <button onClick={onLogout}>
                  <span className="material-symbols-outlined">logout</span>
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <NavLink className="primary" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </nav>
      <div className="secondary-nav">
        <div className="secondary-nav-inner">
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Products
          </NavLink>
          <NavLink
            to="/solutions"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Solutions
          </NavLink>
        </div>
      </div>
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
                  <NavLink
                    to="/cloud-strategy"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cloud Strategy
                  </NavLink>
                  <NavLink
                    to="/platform-engineering"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Platform Engineering
                  </NavLink>
                  <NavLink
                    to="/reliability"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Reliability
                  </NavLink>
                  <NavLink
                    to="/consulting"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Consulting
                  </NavLink>
                </div>
              </div>
              <div className="mobile-menu-section">
                <div className="mobile-menu-section-title">Product</div>
                <div className="mobile-menu-section-content">
                  <NavLink
                    to="/platform"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Platform
                  </NavLink>
                  <NavLink
                    to="/pricing"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </NavLink>
                  <NavLink
                    to="/security"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Security
                  </NavLink>
                  <NavLink
                    to="/status"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Status
                  </NavLink>
                </div>
              </div>
              <div className="mobile-menu-section">
                <div className="mobile-menu-section-title">Products & Solutions</div>
                <div className="mobile-menu-section-content">
                  <NavLink
                    to="/products"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to="/solutions"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Solutions
                  </NavLink>
                </div>
              </div>
              <NavLink
                to="/docs"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
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
              <li><NavLink to="/platform">Platform</NavLink></li>
              <li><NavLink to="/pricing">Pricing</NavLink></li>
              <li><NavLink to="/security">Security</NavLink></li>
              <li><NavLink to="/status">Status</NavLink></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><NavLink to="/cloud-strategy">Cloud Strategy</NavLink></li>
              <li><NavLink to="/platform-engineering">Platform Engineering</NavLink></li>
              <li><NavLink to="/reliability">Reliability</NavLink></li>
              <li><NavLink to="/consulting">Consulting</NavLink></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/news">News</NavLink></li>
              <li><NavLink to="/careers">Careers</NavLink></li>
              <li><NavLink to="/partners">Partners</NavLink></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms">Terms of Service</NavLink></li>
              <li><NavLink to="/cookies">Cookie Policy</NavLink></li>
              <li><NavLink to="/sitemap">Sitemap</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
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
          path="/platform"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Platform />
            </Layout>
          }
        />
        <Route
          path="/pricing"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Pricing />
            </Layout>
          }
        />
        <Route
          path="/security"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Security />
            </Layout>
          }
        />
        <Route
          path="/status"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Status />
            </Layout>
          }
        />
        <Route
          path="/cloud-strategy"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <CloudStrategy />
            </Layout>
          }
        />
        <Route
          path="/platform-engineering"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <PlatformEngineering />
            </Layout>
          }
        />
        <Route
          path="/reliability"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Reliability />
            </Layout>
          }
        />
        <Route
          path="/consulting"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Consulting />
            </Layout>
          }
        />
        <Route
          path="/careers"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Careers />
            </Layout>
          }
        />
        <Route
          path="/partners"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Partners />
            </Layout>
          }
        />
        <Route
          path="/sitemap"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Sitemap />
            </Layout>
          }
        />
        <Route
          path="/privacy"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <PrivacyPolicy />
            </Layout>
          }
        />
        <Route
          path="/terms"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <TermsOfService />
            </Layout>
          }
        />
        <Route
          path="/cookies"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <CookiePolicy />
            </Layout>
          }
        />
        <Route
          path="/docs"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Docs />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/solutions"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Solutions />
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
          path="/dashboard"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Settings />
            </Layout>
          }
        />
        <Route
          path="/notifications"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Notifications />
            </Layout>
          }
        />
        <Route
          path="/documentation"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Documentation />
            </Layout>
          }
        />
        <Route
          path="/support"
          element={
            <Layout token={token} profile={profile} onLogout={handleLogout}>
              <Support />
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
