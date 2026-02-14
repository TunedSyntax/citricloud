import { Link } from "react-router-dom";

function Platform() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="badge">Platform Suite</div>
            <h1>Deliver a unified cloud platform with developer-ready guardrails.</h1>
            <p>
              Citricloud Platform aligns architecture, policy, and automation so teams ship faster
              without sacrificing cost control or compliance.
            </p>
            <div className="cta-row">
              <Link className="primary" to="/contact">Request a demo</Link>
              <Link className="ghost" to="/docs">Explore the docs</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">Unified control</span>
              <span className="hero-pill outline">Multi-cloud</span>
            </div>
            <div className="hero-metrics">
              <div className="hero-stat">
                <div className="hero-stat-value">92%</div>
                <div className="hero-stat-label">Policy coverage</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">3x</div>
                <div className="hero-stat-label">Release throughput</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">28%</div>
                <div className="hero-stat-label">Cost savings</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">48 hrs</div>
                <div className="hero-stat-label">Time to onboard</div>
              </div>
            </div>
            <div className="hero-panel-footer">Standardize golden paths without slowing teams down.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Developer portal</h3>
          <p>Curated templates, service catalog, and self-serve workflows for fast starts.</p>
        </article>
        <article className="card">
          <h3>Policy as code</h3>
          <p>Governance integrated into pipelines with audit-ready trails and approvals.</p>
        </article>
        <article className="card">
          <h3>Cloud cost controls</h3>
          <p>Budgets, alerts, and optimization playbooks tailored to each product team.</p>
        </article>
      </section>

      <section className="split">
        <div>
          <h2>Core capabilities</h2>
          <p>
            Build a platform that supports product teams end-to-end. From provisioning to
            observability, every workflow is standardized and measured.
          </p>
          <ul className="checklist">
            <li>Golden paths for services, data, and AI workloads</li>
            <li>Automated compliance checks and evidence collection</li>
            <li>Centralized identity, secrets, and access governance</li>
            <li>Shared observability dashboards and SLO tracking</li>
          </ul>
        </div>
        <div className="panel light">
          <div className="panel-title">Launch kit</div>
          <p>Everything your teams need to ship in a day:</p>
          <ul>
            <li>Infrastructure blueprints</li>
            <li>CI/CD starter pipelines</li>
            <li>Security baselines and guardrails</li>
            <li>On-call and incident response templates</li>
          </ul>
        </div>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Platform blueprint</h2>
        <div className="list">
          <article className="card">
            <h3>Architecture standards</h3>
            <p>Reference patterns for services, data, and observability.</p>
          </article>
          <article className="card">
            <h3>Workflow automation</h3>
            <p>Provisioning, CI/CD, and environment governance baked in.</p>
          </article>
          <article className="card">
            <h3>Governance dashboards</h3>
            <p>Shared visibility into cost, reliability, and security posture.</p>
          </article>
          <article className="card">
            <h3>Adoption playbook</h3>
            <p>Rollout plans, training, and team enablement assets.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Platform;
