import { Link } from "react-router-dom";

function Careers() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Join a team shaping the future of cloud delivery.</h1>
            <p>We hire engineers and consultants who love impact, ownership, and collaboration.</p>
            <div className="cta-row">
              <Link className="primary" to="/contact">Apply now</Link>
              <Link className="ghost" to="/partners">Meet our partners</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">Remote first</span>
              <span className="hero-pill outline">EU focus</span>
            </div>
            <div className="hero-panel-footer">Build meaningful platforms with global teams.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Platform Engineer</h3>
          <p>Build golden paths, CI/CD systems, and developer experience programs.</p>
        </article>
        <article className="card">
          <h3>Cloud Architect</h3>
          <p>Design resilient architectures and guide multi-cloud modernization.</p>
        </article>
        <article className="card">
          <h3>SRE Consultant</h3>
          <p>Lead reliability engagements, incident response, and SLO adoption.</p>
        </article>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Benefits and growth</h2>
        <div className="list">
          <article className="card">
            <h3>Remote-first</h3>
            <p>Work from anywhere with flexible hours across EU time zones.</p>
          </article>
          <article className="card">
            <h3>Learning budget</h3>
            <p>Certifications, conferences, and mentorship for every team member.</p>
          </article>
          <article className="card">
            <h3>Ownership</h3>
            <p>High-impact work with autonomy and direct customer collaboration.</p>
          </article>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>Hiring process</h2>
          <ul className="checklist">
            <li>Intro call with a team lead</li>
            <li>Technical deep dive and portfolio review</li>
            <li>Collaborative design session</li>
            <li>Culture and values conversation</li>
          </ul>
        </div>
        <div className="panel light">
          <div className="panel-title">What we value</div>
          <ul>
            <li>Customer empathy</li>
            <li>Clear communication</li>
            <li>Systems thinking</li>
            <li>Ownership mindset</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Careers;
