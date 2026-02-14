import { Link } from "react-router-dom";

function Pricing() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Pricing designed for platform outcomes.</h1>
            <p>Flexible tiers that scale with your organization, from pilot to enterprise rollout.</p>
            <div className="cta-row">
              <Link className="primary" to="/contact">Get a proposal</Link>
              <Link className="ghost" to="/docs">Review scope</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">Transparent</span>
              <span className="hero-pill outline">No surprises</span>
            </div>
            <div className="hero-panel-footer">Pricing aligns with outcomes, not hours.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Starter</h3>
          <p>For teams validating a platform roadmap.</p>
          <ul className="checklist">
            <li>Discovery and architecture review</li>
            <li>1 platform pilot</li>
            <li>Security and cost baseline</li>
          </ul>
        </article>
        <article className="card">
          <h3>Growth</h3>
          <p>For organizations scaling multiple teams.</p>
          <ul className="checklist">
            <li>Platform MVP delivery</li>
            <li>Developer portal and pipelines</li>
            <li>Migration and enablement</li>
          </ul>
        </article>
        <article className="card">
          <h3>Enterprise</h3>
          <p>For complex portfolios and regulated environments.</p>
          <ul className="checklist">
            <li>Multi-cloud operating model</li>
            <li>Compliance automation</li>
            <li>Ongoing SRE support</li>
          </ul>
        </article>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>What is included</h2>
        <div className="list">
          <article className="card">
            <h3>Platform roadmap</h3>
            <p>Prioritized initiatives with timelines, owners, and success metrics.</p>
          </article>
          <article className="card">
            <h3>Enablement</h3>
            <p>Workshops, docs, and handoff so your teams stay independent.</p>
          </article>
          <article className="card">
            <h3>Governance</h3>
            <p>Risk review, audit evidence, and ongoing optimization plans.</p>
          </article>
        </div>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Pricing FAQ</h2>
        <div className="list">
          <article className="card">
            <h3>How is pricing scoped?</h3>
            <p>We scope by outcomes, complexity, and the number of teams impacted.</p>
          </article>
          <article className="card">
            <h3>Can we start with a pilot?</h3>
            <p>Yes. We recommend a pilot to validate ROI before scaling.</p>
          </article>
          <article className="card">
            <h3>Is support included?</h3>
            <p>All tiers include enablement and optional post-launch support.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
