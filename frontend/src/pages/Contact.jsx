import { contactPoints } from "../data/siteData";

function Contact() {
  return (
    <div className="stack">
      <section className="hero">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1>Get in touch</h1>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, maxWidth: 'none' }}>
            Whether you're exploring cloud transformation, evaluating your current platform, or ready to execute a major initiative, we'd love to talk. Let's start a conversation about your goals.
          </p>
        </div>
      </section>

      <section className="split">
        <div className="panel light">
          <div className="panel-title">Direct contact</div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {contactPoints.map((item) => (
              <li key={item} style={{ marginBottom: '12px' }}>{item}</li>
            ))}
          </ul>
          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e0f2fe' }}>
            <p style={{ fontSize: '0.9rem', margin: 0, marginBottom: '12px' }}>
              <strong>Typical response time:</strong> Within 24 hours
            </p>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>
              <strong>Timezone:</strong> CET (Amsterdam)
            </p>
          </div>
        </div>
        <form className="form-card" onSubmit={(event) => event.preventDefault()}>
          <label>
            Full name *
            <input type="text" placeholder="Your name" required />
          </label>
          <label>
            Email *
            <input type="email" placeholder="you@company.com" required />
          </label>
          <label>
            Company
            <input type="text" placeholder="Company name" />
          </label>
          <label>
            Role
            <input type="text" placeholder="Your role (e.g., VP Engineering)" />
          </label>
          <label>
            How can we help? *
            <textarea rows="5" placeholder="Tell us about your goals, current challenges, and timeline." required />
          </label>
          <button className="primary" type="submit">
            Send message
          </button>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '12px 0 0' }}>
            We respect your privacy. Read our <a href="#" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>privacy policy</a>.
          </p>
        </form>
      </section>

      <section className="section soft">
        <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Common questions</h2>
        <div className="list">
          <article className="card">
            <h3>What outcomes should we expect in the first 30 days?</h3>
            <p>
              You will get a clear baseline, a prioritized roadmap, and a fast win or pilot that proves impact in your environment.
            </p>
          </article>
          <article className="card">
            <h3>Can you work with our existing vendors and MSPs?</h3>
            <p>
              Yes. We collaborate with internal teams, MSPs, and vendors to align priorities, reduce handoffs, and keep ownership clear.
            </p>
          </article>
          <article className="card">
            <h3>Do you help with compliance and audits?</h3>
            <p>
              We support SOC 2, ISO 27001, and GDPR readiness by improving controls, logging, access governance, and documentation.
            </p>
          </article>
          <article className="card">
            <h3>Is this a strategy engagement or hands-on delivery?</h3>
            <p>
              Both. We can lead strategy and also implement alongside your engineers to keep momentum and transfer knowledge.
            </p>
          </article>
          <article className="card">
            <h3>How do you measure success?</h3>
            <p>
              We define KPIs together: cost savings, reliability targets, deployment speed, incident reduction, or migration milestones.
            </p>
          </article>
          <article className="card">
            <h3>Can you provide references or case studies?</h3>
            <p>
              Yes. We can share relevant case studies and connect you with references when appropriate.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Contact;
