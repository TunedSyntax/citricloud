import { Link } from "react-router-dom";

function Security() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="badge">Trust Center</div>
            <h1>Security guardrails embedded in every release.</h1>
            <p>
              Build secure-by-default delivery pipelines with continuous policy checks, access
              governance, and real-time posture monitoring.
            </p>
            <div className="cta-row">
              <Link className="primary" to="/contact">Talk to security</Link>
              <Link className="ghost" to="/docs">View security docs</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">SOC 2 ready</span>
              <span className="hero-pill outline">GDPR aligned</span>
            </div>
            <div className="hero-panel-footer">Evidence is generated automatically for audits.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Identity and access</h3>
          <p>Centralized SSO, least-privilege access, and break-glass workflows.</p>
        </article>
        <article className="card">
          <h3>Supply chain security</h3>
          <p>Signed artifacts, dependency scanning, and policy gates in CI/CD.</p>
        </article>
        <article className="card">
          <h3>Runtime protection</h3>
          <p>Continuous threat detection with automated response playbooks.</p>
        </article>
      </section>

      <section className="split">
        <div>
          <h2>Compliance coverage</h2>
          <p>We align controls and reporting for the frameworks you rely on.</p>
          <ul className="checklist">
            <li>SOC 2 Type II readiness</li>
            <li>ISO 27001 control mapping</li>
            <li>GDPR and data residency</li>
            <li>Continuous audit evidence</li>
          </ul>
        </div>
        <div className="panel light">
          <div className="panel-title">Security deliverables</div>
          <ul>
            <li>Threat models and risk register</li>
            <li>Access reviews and entitlement tracking</li>
            <li>Incident response runbooks</li>
            <li>Quarterly posture assessments</li>
          </ul>
        </div>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Security operations</h2>
        <div className="list">
          <article className="card">
            <h3>Continuous monitoring</h3>
            <p>24/7 posture monitoring with alerts mapped to SLOs.</p>
          </article>
          <article className="card">
            <h3>Vulnerability management</h3>
            <p>Automated scanning, remediation plans, and executive reporting.</p>
          </article>
          <article className="card">
            <h3>Incident readiness</h3>
            <p>Tabletop exercises, runbooks, and stakeholder escalation paths.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Security;
