import { Link } from "react-router-dom";

function Docs() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="badge">Docs Hub</div>
            <h1>Documentation for every step of your platform journey.</h1>
            <p>Get started fast with guides, API references, and best practices.</p>
            <div className="cta-row">
              <Link className="primary" to="/contact">Talk to support</Link>
              <Link className="ghost" to="/platform">Platform overview</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">Quickstart</span>
              <span className="hero-pill outline">API</span>
            </div>
            <div className="hero-panel-footer">Everything you need to onboard in days.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Getting started</h3>
          <p>Set up access, configure your first workspace, and deploy a service.</p>
        </article>
        <article className="card">
          <h3>Platform guides</h3>
          <p>Golden paths, service templates, and automation workflows.</p>
        </article>
        <article className="card">
          <h3>API reference</h3>
          <p>Comprehensive endpoints for governance, billing, and monitoring.</p>
        </article>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Popular docs</h2>
        <div className="list">
          <article className="card">
            <h3>Integrations</h3>
            <p>Connect CI/CD, observability, and identity providers.</p>
          </article>
          <article className="card">
            <h3>Security baseline</h3>
            <p>Configure policies, secrets management, and audit logging.</p>
          </article>
          <article className="card">
            <h3>Migration playbooks</h3>
            <p>Move legacy workloads with minimal downtime.</p>
          </article>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>Learning paths</h2>
          <ul className="checklist">
            <li>Platform onboarding in 7 days</li>
            <li>Secure delivery pipelines</li>
            <li>Observability and SLO management</li>
            <li>Cost optimization playbooks</li>
          </ul>
        </div>
        <div className="panel light">
          <div className="panel-title">Docs support</div>
          <ul>
            <li>Office hours and live Q&A</li>
            <li>Implementation examples</li>
            <li>Reference architectures</li>
            <li>Release notes and changelog</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Docs;
