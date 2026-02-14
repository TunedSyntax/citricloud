import { Link } from "react-router-dom";

function PlatformEngineering() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Build an internal developer platform teams love to use.</h1>
            <p>Golden paths, automation, and enablement that reduce toil and improve reliability.</p>
            <div className="cta-row">
              <Link className="primary" to="/contact">Plan a platform sprint</Link>
              <Link className="ghost" to="/docs">Read platform guides</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">Golden paths</span>
              <span className="hero-pill outline">Self-serve</span>
            </div>
            <div className="hero-panel-footer">Enable teams without creating bottlenecks.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Developer experience</h3>
          <p>Portals, service catalogs, and templates that are easy to adopt.</p>
        </article>
        <article className="card">
          <h3>Automation</h3>
          <p>Provisioning, CI/CD, and deployment workflows built for scale.</p>
        </article>
        <article className="card">
          <h3>Enablement</h3>
          <p>Training, docs, and guardrails that empower teams to move fast.</p>
        </article>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Platform scorecard</h2>
        <div className="list">
          <article className="card">
            <h3>Adoption rate</h3>
            <p>Track how many services are using golden paths and templates.</p>
          </article>
          <article className="card">
            <h3>Time-to-provision</h3>
            <p>Measure how quickly teams can launch a new service.</p>
          </article>
          <article className="card">
            <h3>Developer satisfaction</h3>
            <p>Pulse surveys and feedback loops tied to roadmap updates.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default PlatformEngineering;
