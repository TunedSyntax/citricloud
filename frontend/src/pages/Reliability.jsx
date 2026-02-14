import { Link } from "react-router-dom";

function Reliability() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Operational excellence with SRE practices built-in.</h1>
            <p>Improve uptime, reduce incidents, and ship with confidence.</p>
            <div className="cta-row">
              <Link className="primary" to="/contact">Talk to reliability</Link>
              <Link className="ghost" to="/docs">Reliability playbooks</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">SLO-driven</span>
              <span className="hero-pill outline">Always-on</span>
            </div>
            <div className="hero-panel-footer">Uptime and performance tracked in real time.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>SLOs and error budgets</h3>
          <p>Clear service targets with automated alerting and review cycles.</p>
        </article>
        <article className="card">
          <h3>Incident response</h3>
          <p>Structured playbooks, on-call rotations, and postmortems.</p>
        </article>
        <article className="card">
          <h3>Resilience testing</h3>
          <p>Chaos testing and DR validation to prevent surprises.</p>
        </article>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Reliability program</h2>
        <div className="list">
          <article className="card">
            <h3>Operational reviews</h3>
            <p>Quarterly reliability reviews and improvement plans.</p>
          </article>
          <article className="card">
            <h3>Performance baselines</h3>
            <p>Latency and throughput targets mapped to customer SLAs.</p>
          </article>
          <article className="card">
            <h3>Runbook automation</h3>
            <p>Automated remediation for high-frequency incidents.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Reliability;
