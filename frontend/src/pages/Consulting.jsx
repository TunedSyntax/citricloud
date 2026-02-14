import { Link } from "react-router-dom";

function Consulting() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Hands-on cloud consulting that delivers outcomes.</h1>
            <p>Senior practitioners who embed with your teams to execute critical work.</p>
            <div className="cta-row">
              <Link className="primary" to="/contact">Request staffing</Link>
              <Link className="ghost" to="/pricing">See engagement models</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">Flexible</span>
              <span className="hero-pill outline">Outcome-led</span>
            </div>
            <div className="hero-panel-footer">Scale up or down as priorities shift.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Embedded teams</h3>
          <p>Architects, platform engineers, and SREs integrated into your squads.</p>
        </article>
        <article className="card">
          <h3>Advisory</h3>
          <p>Executive guidance, vendor evaluation, and program management.</p>
        </article>
        <article className="card">
          <h3>Rapid response</h3>
          <p>Short-term expert support for outages, migrations, or audits.</p>
        </article>
      </section>

      <section className="split">
        <div>
          <h2>Engagement options</h2>
          <p>Choose the level of support that fits your roadmap and budget.</p>
          <ul className="checklist">
            <li>Fractional advisory for leadership teams</li>
            <li>Full-time delivery squads for key initiatives</li>
            <li>Expert review for critical milestones</li>
          </ul>
        </div>
        <div className="panel light">
          <div className="panel-title">Typical deliverables</div>
          <ul>
            <li>Architecture blueprints</li>
            <li>Implementation plans</li>
            <li>Cost and risk assessments</li>
            <li>Enablement workshops</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Consulting;
