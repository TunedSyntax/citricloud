import { Link } from "react-router-dom";

function CloudStrategy() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="badge">Strategy Lab</div>
            <h1>Design a cloud roadmap that aligns cost, speed, and security.</h1>
            <p>We help you establish a practical roadmap and operating model that scales.</p>
            <div className="cta-row">
              <Link className="primary" to="/contact">Start a strategy session</Link>
              <Link className="ghost" to="/pricing">View engagement tiers</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">Roadmaps</span>
              <span className="hero-pill outline">Operating model</span>
            </div>
            <div className="hero-panel-footer">Strategy grounded in measurable outcomes.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Discovery workshops</h3>
          <p>Stakeholder alignment, inventory, and pain-point mapping.</p>
        </article>
        <article className="card">
          <h3>Target architecture</h3>
          <p>Reference designs for security, data, and app platforms.</p>
        </article>
        <article className="card">
          <h3>Execution plan</h3>
          <p>Sequenced roadmap with milestones, owners, and KPIs.</p>
        </article>
      </section>

      <section className="split">
        <div>
          <h2>Strategy deliverables</h2>
          <ul className="checklist">
            <li>Cloud operating model and governance map</li>
            <li>Capability maturity assessment</li>
            <li>Target platform architecture and workload segmentation</li>
            <li>Budget forecast with phased milestones</li>
          </ul>
        </div>
        <div className="panel light">
          <div className="panel-title">Typical timeline</div>
          <ul>
            <li>Week 1: Discovery and data collection</li>
            <li>Week 2: Workshops and target state design</li>
            <li>Week 3: Roadmap and execution plan</li>
            <li>Week 4: Leadership alignment and handoff</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default CloudStrategy;
