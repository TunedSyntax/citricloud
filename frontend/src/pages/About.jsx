function About() {
  return (
    <div className="stack">
      <section className="hero">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1>About Citricloud</h1>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, maxWidth: 'none' }}>
            We're a boutique cloud engineering studio helping teams modernize and operate secure, efficient platforms. Our approach combines deep technical expertise with organizational change management to ensure lasting transformation.
          </p>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>Our Mission</h2>
          <p>
            Enable product teams to ship confidently with predictable costs. We believe cloud platforms should be enablers, not barriers—they should accelerate innovation while maintaining security, reliability, and cost efficiency.
          </p>
          <p style={{ marginTop: '16px', opacity: 0.8 }}>
            Since 2018, we've worked with Fortune 500 enterprises, Series A-D startups, and everything in between. We've learned that successful cloud transformation requires both technical excellence and organizational alignment.
          </p>
        </div>
        <div className="panel">
          <div className="panel-title">By the numbers</div>
          <ul>
            <li><strong>50+</strong> organizations served</li>
            <li><strong>10,000+</strong> deployments facilitated</li>
            <li><strong>6+ years</strong> in cloud transformation</li>
            <li><strong>99.95%</strong> avg uptime for clients</li>
          </ul>
        </div>
      </section>

      <section className="section soft">
        <h2 style={{ marginBottom: '24px' }}>Our Values</h2>
        <div className="list">
          <article className="card">
            <h3>Pragmatism</h3>
            <p>We focus on what works in reality, not theoretical perfection. Every recommendation is grounded in practical experience and your specific constraints.</p>
          </article>
          <article className="card">
            <h3>Transparency</h3>
            <p>No hidden agendas. We'll tell you what we see, recommend what's best for your business, and explain the tradeoffs clearly.</p>
          </article>
          <article className="card">
            <h3>Collaboration</h3>
            <p>We work alongside your teams, not above them. Our success is measured by how well your organization owns the outcomes.</p>
          </article>
          <article className="card">
            <h3>Excellence</h3>
            <p>High standards in everything we do—from code quality to documentation to delivery timelines. Your reputation is our reputation.</p>
          </article>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>Our Approach</h2>
          <h3>Assess</h3>
          <p>
            We start with listening. Understanding your current state, business objectives, technical constraints, and team capabilities shapes everything that follows.
          </p>
          <h3 style={{ marginTop: '20px' }}>Design</h3>
          <p>
            Working collaboratively, we design solutions that are secure, scalable, and aligned with your organizational culture. Architecture without buy-in is just a nice document.
          </p>
          <h3 style={{ marginTop: '20px' }}>Execute</h3>
          <p>
            We ship. Using proven practices and automation-first mindset, we reduce risk while maintaining velocity. Your team gets hands-on experience throughout.
          </p>
          <h3 style={{ marginTop: '20px' }}>Empower</h3>
          <p>
            Our goal is to leave you stronger. Knowledge transfer, runbook creation, and team training ensure sustainable operations long after we're gone.
          </p>
        </div>
        <div className="panel">
          <div className="panel-title">Our Team</div>
          <p style={{ marginBottom: '12px', fontSize: '0.95rem' }}>
            Citricloud is led by cloud architects and platform engineers with 15+ years of collective experience across AWS, GCP, Kubernetes, and enterprise infrastructure.
          </p>
          <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
            We've built teams at scale, managed critical infrastructure, and led successful migrations. We know the challenges you're facing because we've faced them too.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
