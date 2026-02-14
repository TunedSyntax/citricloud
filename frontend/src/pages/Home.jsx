import { highlights } from "../data/siteData";

function Home() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="badge">Cloud Platform Studio</div>
            <h1>Confident cloud delivery for ambitious teams.</h1>
            <p>
              Citricloud helps product organizations design platforms that scale, stay compliant, and delight developers. From architecture to operations, we partner with you every step of the way.
            </p>
            <div className="cta-row">
              <button className="primary">Plan a discovery call</button>
              <button className="ghost">Download overview</button>
            </div>
            <div className="hero-note">Trusted by 50+ global enterprises to reduce risk and accelerate delivery.</div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <span className="hero-pill">Now onboarding</span>
              <span className="hero-pill outline">Q2 2026</span>
            </div>
            <div className="hero-metrics">
              <div className="hero-stat">
                <div className="hero-stat-value">28%</div>
                <div className="hero-stat-label">Cost reduction</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">3.4x</div>
                <div className="hero-stat-label">Release speed</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">99.95%</div>
                <div className="hero-stat-label">Uptime target</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">6 wks</div>
                <div className="hero-stat-label">Launch runway</div>
              </div>
            </div>
            <div className="hero-panel-footer">Launch readiness with security and observability built-in.</div>
          </div>
        </div>
      </section>

      <section className="grid">
        {highlights.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="split">
        <div>
          <h2>Platform clarity from day one</h2>
          <p>
            From architecture workshops to enablement, we turn complex cloud decisions into actionable rollout plans. Our methodology combines industry best practices with your organizational goals.
          </p>
          <p style={{ marginTop: '16px', opacity: 0.8 }}>
            We helped a Fortune 500 fintech reduce their infrastructure costs by 34% while improving deployment frequency by 3.2x, all while maintaining 99.99% uptime. Your cloud transformation is unique—we treat it that way.
          </p>
        </div>
        <div className="panel">
          <div className="panel-title">Latest improvements</div>
          <ul>
            <li>Automation coverage: 94% (+3%)</li>
            <li>Deployments last month: 187 (+15%)</li>
            <li>Mean time to recover: 18 mins (-4)</li>
            <li>Security scan pass rate: 98.2% (+1.2%)</li>
          </ul>
        </div>
      </section>

      <section className="section soft">
        <h2 style={{ marginBottom: '24px' }}>Why teams choose Citricloud</h2>
        <div className="list">
          <article className="card" style={{ textAlign: 'center' }}>
            <h3>🚀 Hands-on expertise</h3>
            <p>Our team has shipped over 10,000 deployments across 200+ organizations. We know what works.</p>
          </article>
          <article className="card" style={{ textAlign: 'center' }}>
            <h3>🔒 Security first</h3>
            <p>Built for regulated industries. SOC2, ISO27001, and compliance reviews are standard in our approach.</p>
          </article>
          <article className="card" style={{ textAlign: 'center' }}>
            <h3>📊 Data-driven</h3>
            <p>Every decision backed by metrics. We implement observability from day one, not as an afterthought.</p>
          </article>
          <article className="card" style={{ textAlign: 'center' }}>
            <h3>🎯 Transfer knowledge</h3>
            <p>We empower your teams. Our goal is to leave you stronger, more autonomous, and more confident.</p>
          </article>
        </div>
      </section>

      <section className="split" style={{ justifyItems: 'start' }}>
        <div>
          <h2>Recent success stories</h2>
          <p>
            We recently helped a Series B SaaS company design a new multi-tenant platform architecture that reduced their time-to-market for new enterprise customers from 12 weeks to 3 weeks, while improving stability across 99.95% of requests.
          </p>
          <p style={{ marginTop: '16px', opacity: 0.8 }}>
            Another engagement with a healthcare provider involved migrating a monolithic legacy system to a modern event-driven architecture, improving regulatory compliance posture and reducing operational overhead by 40%.
          </p>
        </div>
        <div className="panel">
          <div className="panel-title">Engagement types</div>
          <ul>
            <li><strong>Strategy</strong> — Architecture workshops</li>
            <li><strong>Implementation</strong> — Hands-on platform launch</li>
            <li><strong>Optimization</strong> — Cost & reliability audits</li>
            <li><strong>Training</strong> — Team enablement &amp; handoff</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;
