import { services } from "../data/siteData";

function Services() {
  return (
    <div className="stack">
      <section className="hero">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1>Services</h1>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, maxWidth: 'none' }}>
            Flexible engagement models designed to support every phase of your cloud transformation—from initial strategy through sustained optimization.
          </p>
        </div>
      </section>

      <section className="grid">
        {services.map((service) => (
          <article key={service.name} className="card">
            <h3>{service.name}</h3>
            <p>{service.detail}</p>
          </article>
        ))}
      </section>

      <section className="section soft">
        <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>How we work</h2>
        <div className="split" style={{ gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <h3>Discovery (Weeks 1-2)</h3>
            <p>
              We deeply understand your current architecture, business constraints, team capacity, and strategic objectives. This phase includes architecture reviews, security assessments, and stakeholder interviews.
            </p>
            <ul style={{ marginTop: '12px' }}>
              <li>Current state assessment</li>
              <li>Security &amp; compliance review</li>
              <li>Stakeholder alignment workshops</li>
              <li>Opportunity identification</li>
            </ul>
          </div>
          <div>
            <h3>Design (Weeks 2-4)</h3>
            <p>
              Collaborative architecture design sessions with your engineering leadership. We create detailed implementation roadmaps, technology recommendations, and risk mitigation strategies.
            </p>
            <ul style={{ marginTop: '12px' }}>
              <li>Architecture design workshops</li>
              <li>Technology recommendations</li>
              <li>Implementation roadmap</li>
              <li>Documentation &amp; runbooks</li>
            </ul>
          </div>
          <div>
            <h3>Implementation (Weeks 4-12)</h3>
            <p>
              Hands-on platform development and infrastructure work. Your team works alongside us, learning practices and patterns as we build. Code reviews, pair programming, and knowledge sharing throughout.
            </p>
            <ul style={{ marginTop: '12px' }}>
              <li>Hands-on development</li>
              <li>Infrastructure provisioning</li>
              <li>CI/CD pipeline setup</li>
              <li>Security &amp; monitoring integration</li>
            </ul>
          </div>
          <div>
            <h3>Optimization (Ongoing)</h3>
            <p>
              Continuous improvement of cost, reliability, and developer experience. Post-engagement support, monitoring, and optimization recommendations based on real operational metrics.
            </p>
            <ul style={{ marginTop: '12px' }}>
              <li>Cost optimization audits</li>
              <li>Reliability reviews</li>
              <li>Performance tuning</li>
              <li>Team enablement &amp; training</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>Engagement Models</h2>
          <h3>Advisory</h3>
          <p>
            Executive advisors reviewing strategic cloud investments. Ideal for CTO/VP Engineering alignment on platform decisions. 10-20 hours/month.
          </p>
          <h3 style={{ marginTop: '20px' }}>Project-based</h3>
          <p>
            Dedicated team for 8-12 weeks focused on a specific initiative: platform launch, migration, or optimization. Full-time engagement with your engineering organization.
          </p>
          <h3 style={{ marginTop: '20px' }}>Staffing</h3>
          <p>
            Dedicated engineer joins your team long-term to implement architectural improvements and build new platform capabilities. Integrated into your org structure and processes.
          </p>
        </div>
        <div className="panel">
          <div className="panel-title">Service Stack</div>
          <ul>
            <li>Kubernetes &amp; container orchestration</li>
            <li>Multi-cloud (AWS, GCP, Azure)</li>
            <li>CI/CD &amp; infrastructure automation</li>
            <li>Observability &amp; monitoring</li>
            <li>Security &amp; compliance tooling</li>
            <li>Cost optimization &amp; governance</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Services;
