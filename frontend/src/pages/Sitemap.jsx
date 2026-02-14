import { Link } from "react-router-dom";

function Sitemap() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="badge">Site Index</div>
            <h1>Explore every Citricloud page.</h1>
            <p>Quick access to product, services, company, and legal resources.</p>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="list">
          <article className="card">
            <h3>Product</h3>
            <ul>
              <li><Link to="/platform">Platform</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/security">Security</Link></li>
              <li><Link to="/status">Status</Link></li>
            </ul>
          </article>
          <article className="card">
            <h3>Services</h3>
            <ul>
              <li><Link to="/cloud-strategy">Cloud Strategy</Link></li>
              <li><Link to="/platform-engineering">Platform Engineering</Link></li>
              <li><Link to="/reliability">Reliability</Link></li>
              <li><Link to="/consulting">Consulting</Link></li>
            </ul>
          </article>
          <article className="card">
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/partners">Partners</Link></li>
            </ul>
          </article>
          <article className="card">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </article>
          <article className="card">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/docs">Docs</Link></li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Support</h2>
        <div className="list">
          <article className="card">
            <h3>Help center</h3>
            <p>Guides, troubleshooting, and platform best practices.</p>
          </article>
          <article className="card">
            <h3>Contact support</h3>
            <p>Reach our team for urgent requests or technical assistance.</p>
          </article>
          <article className="card">
            <h3>Status updates</h3>
            <p>Subscribe to platform health and incident notifications.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Sitemap;
