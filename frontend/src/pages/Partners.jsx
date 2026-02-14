import { Link } from "react-router-dom";

function Partners() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="badge">Partner Network</div>
            <h1>Partner with Citricloud to deliver cloud excellence.</h1>
            <p>We collaborate with technology providers, MSPs, and integrators.</p>
            <div className="cta-row">
              <Link className="primary" to="/contact">Become a partner</Link>
              <Link className="ghost" to="/docs">Integration guides</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">Ecosystem</span>
              <span className="hero-pill outline">Shared growth</span>
            </div>
            <div className="hero-panel-footer">Create new value for shared customers.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Technology partners</h3>
          <p>Infrastructure, observability, and security platforms.</p>
        </article>
        <article className="card">
          <h3>Service partners</h3>
          <p>MSPs and integrators delivering execution and adoption.</p>
        </article>
        <article className="card">
          <h3>Alliance benefits</h3>
          <p>Joint go-to-market, co-selling, and enablement programs.</p>
        </article>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Program tiers</h2>
        <div className="list">
          <article className="card">
            <h3>Referral</h3>
            <p>Shared leads, co-marketing, and joint customer events.</p>
          </article>
          <article className="card">
            <h3>Delivery</h3>
            <p>Joint delivery teams with shared services and enablement.</p>
          </article>
          <article className="card">
            <h3>Strategic</h3>
            <p>Co-innovation, joint roadmaps, and platform integrations.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Partners;
