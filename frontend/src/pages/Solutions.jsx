import { Link } from "react-router-dom";

function Solutions() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Solutions designed for real-world cloud challenges.</h1>
            <p>
              From regulated industries to high-growth SaaS, Citricloud helps teams modernize
              infrastructure, automate governance, and accelerate delivery.
            </p>
            <div className="cta-row">
              <Link className="primary" to="/contact">Talk to an expert</Link>
              <Link className="ghost" to="/services">See our services</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">Use cases</span>
              <span className="hero-pill outline">Industry-ready</span>
            </div>
            <div className="hero-panel-footer">Built for scale, compliance, and speed.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>FinTech modernization</h3>
          <p>Meet regulatory requirements with secure-by-default pipelines.</p>
        </article>
        <article className="card">
          <h3>Healthcare data platforms</h3>
          <p>Protect PHI with automated controls and comprehensive audit trails.</p>
        </article>
        <article className="card">
          <h3>SaaS scale-up</h3>
          <p>Improve release throughput without losing reliability or cost control.</p>
        </article>
        <article className="card">
          <h3>Retail omnichannel</h3>
          <p>Keep services resilient during seasonal traffic spikes.</p>
        </article>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Outcome-driven programs</h2>
        <div className="list">
          <article className="card">
            <h3>Cloud landing zone</h3>
            <p>Launch standardized environments with shared policy and network patterns.</p>
          </article>
          <article className="card">
            <h3>Developer enablement</h3>
            <p>Reduce onboarding time with templates, scorecards, and service catalogs.</p>
          </article>
          <article className="card">
            <h3>Reliability acceleration</h3>
            <p>Implement SLOs, error budgets, and incident response workflows.</p>
          </article>
          <article className="card">
            <h3>FinOps optimization</h3>
            <p>Align budgets, showback, and automation to control spend.</p>
          </article>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>How we deliver</h2>
          <p>
            Each solution combines advisory, platform enablement, and hands-on delivery to create
            measurable impact within weeks.
          </p>
          <ul className="checklist">
            <li>Assessment and roadmap creation</li>
            <li>Architecture and policy design</li>
            <li>Automation and tooling rollout</li>
            <li>Training and operational handoff</li>
          </ul>
        </div>
        <div className="panel light">
          <div className="panel-title">Typical outcomes</div>
          <ul>
            <li>30-50% faster onboarding</li>
            <li>25% lower cloud spend</li>
            <li>99.9%+ uptime targets</li>
            <li>Audit-ready evidence in weeks</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Solutions;
