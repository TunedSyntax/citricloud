import { Link } from "react-router-dom";

function Products() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Everything you need to run secure, scalable cloud platforms.</h1>
            <p>
              The Citricloud product suite brings governance, automation, and visibility into one
              platform so teams can ship faster with confidence.
            </p>
            <div className="cta-row">
              <Link className="primary" to="/contact">Request a demo</Link>
              <Link className="ghost" to="/docs">Explore the docs</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">Platform suite</span>
              <span className="hero-pill outline">Enterprise-ready</span>
            </div>
            <div className="hero-panel-footer">Built for product teams, security, and FinOps.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Platform Control Center</h3>
          <p>Central governance, policy enforcement, and audit-ready visibility.</p>
        </article>
        <article className="card">
          <h3>Developer Portal</h3>
          <p>Self-serve templates, golden paths, and onboarding workflows.</p>
        </article>
        <article className="card">
          <h3>Reliability Suite</h3>
          <p>Service health, incident response, and SLO reporting in one place.</p>
        </article>
        <article className="card">
          <h3>Cost Intelligence</h3>
          <p>Budgeting, anomaly detection, and optimization playbooks.</p>
        </article>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Product highlights</h2>
        <div className="list">
          <article className="card">
            <h3>Unified security posture</h3>
            <p>Continuous compliance checks and evidence collection across clouds.</p>
          </article>
          <article className="card">
            <h3>Automation workflows</h3>
            <p>Standardize provisioning, approvals, and CI/CD guardrails.</p>
          </article>
          <article className="card">
            <h3>Executive dashboards</h3>
            <p>Report progress on reliability, cost, and delivery velocity.</p>
          </article>
          <article className="card">
            <h3>Integrations</h3>
            <p>Connect identity providers, observability tools, and ticketing systems.</p>
          </article>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>Included in every product</h2>
          <p>
            We deliver a consistent platform experience across your teams. Every module includes
            shared security baselines, templates, and governance reports.
          </p>
          <ul className="checklist">
            <li>Role-based access controls and approvals</li>
            <li>Pre-built cloud landing zones</li>
            <li>Audit trails and compliance reporting</li>
            <li>24/7 reliability and usage insights</li>
          </ul>
        </div>
        <div className="panel light">
          <div className="panel-title">Implementation timeline</div>
          <ul>
            <li>Week 1: Discovery and roadmap</li>
            <li>Week 2: Platform blueprint</li>
            <li>Week 3: Pilot rollout</li>
            <li>Week 4: Team enablement</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Products;
