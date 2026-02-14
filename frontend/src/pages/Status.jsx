import { Link } from "react-router-dom";

function Status() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Citricloud service status.</h1>
            <p>Real-time visibility into platform health, planned maintenance, and incidents.</p>
            <div className="cta-row">
              <Link className="primary" to="/docs">Status API</Link>
              <Link className="ghost" to="/contact">Subscribe to updates</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">All systems</span>
              <span className="hero-pill outline">Operational</span>
            </div>
            <div className="hero-panel-footer">Last updated 2 minutes ago.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Platform API</h3>
          <p>99.98% uptime in the last 30 days</p>
        </article>
        <article className="card">
          <h3>Developer Portal</h3>
          <p>99.95% uptime in the last 30 days</p>
        </article>
        <article className="card">
          <h3>Automation Pipelines</h3>
          <p>99.97% uptime in the last 30 days</p>
        </article>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Recent incidents</h2>
        <div className="list">
          <article className="card">
            <h3>Feb 10, 2026 - Portal latency</h3>
            <p>Resolved. Elevated latency in EU region during peak traffic window.</p>
          </article>
          <article className="card">
            <h3>Jan 29, 2026 - Pipeline delay</h3>
            <p>Resolved. Queue backlog from third-party registry maintenance.</p>
          </article>
          <article className="card">
            <h3>Jan 12, 2026 - Monitoring update</h3>
            <p>Resolved. Metrics ingestion stabilized after config rollout.</p>
          </article>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>Maintenance windows</h2>
          <p>We announce planned maintenance at least 7 days in advance.</p>
          <ul className="checklist">
            <li>Monthly platform updates on the second Tuesday</li>
            <li>Emergency maintenance only with customer approval</li>
            <li>Regional rollouts to minimize impact</li>
          </ul>
        </div>
        <div className="panel light">
          <div className="panel-title">Status channels</div>
          <ul>
            <li>Email incident updates</li>
            <li>Status API and webhooks</li>
            <li>Slack and Teams notifications</li>
            <li>Dedicated incident bridge</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Status;
