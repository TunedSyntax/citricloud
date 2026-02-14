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

      {/* Contact Methods */}
      <section className="section soft">
        <h2 style={{ marginBottom: '32px', textAlign: 'center' }}>Contact Methods</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <div style={{ padding: '24px', background: 'white', border: '1px solid #e0f2fe', textAlign: 'center', borderRadius: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#0ea5e9', display: 'block', marginBottom: '12px' }}>mail</span>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Email</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#64748b' }}>For general inquiries</p>
            <a href="mailto:hello@citricloud.com" style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: 500 }}>hello@citricloud.com</a>
          </div>

          <div style={{ padding: '24px', background: 'white', border: '1px solid #e0f2fe', textAlign: 'center', borderRadius: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#0ea5e9', display: 'block', marginBottom: '12px' }}>phone</span>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Phone</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#64748b' }}>Direct line available</p>
            <a href="tel:+31201234567" style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: 500 }}>+31 (0) 20 123 4567</a>
          </div>

          <div style={{ padding: '24px', background: 'white', border: '1px solid #e0f2fe', textAlign: 'center', borderRadius: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#0ea5e9', display: 'block', marginBottom: '12px' }}>location_on</span>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Office</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#64748b' }}>Amsterdam, Netherlands</p>
            <p style={{ margin: '0', fontSize: '0.85rem', color: '#64748b' }}>Visiting by appointment</p>
          </div>
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
            We respect your privacy. Read our <a href="/privacy-policy" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>privacy policy</a>.
          </p>
        </form>
      </section>

      {/* Teams & Departments */}
      <section className="section soft">
        <h2 style={{ marginBottom: '32px', textAlign: 'center' }}>Teams & Departments</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <article className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#0ea5e9' }}>engineering</span>
              <h3 style={{ margin: 0 }}>Engineering</h3>
            </div>
            <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Platform architecture, infrastructure design, and technical implementation</p>
            <a href="mailto:engineering@citricloud.com" style={{ color: '#0ea5e9', textDecoration: 'none', fontSize: '0.9rem' }}>engineering@citricloud.com</a>
          </article>

          <article className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#0ea5e9' }}>security</span>
              <h3 style={{ margin: 0 }}>Security & Compliance</h3>
            </div>
            <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Security assessments, compliance audits, and governance solutions</p>
            <a href="mailto:security@citricloud.com" style={{ color: '#0ea5e9', textDecoration: 'none', fontSize: '0.9rem' }}>security@citricloud.com</a>
          </article>

          <article className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#0ea5e9' }}>group</span>
              <h3 style={{ margin: 0 }}>Consulting & Strategy</h3>
            </div>
            <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Business analysis, roadmap planning, and strategic guidance</p>
            <a href="mailto:consulting@citricloud.com" style={{ color: '#0ea5e9', textDecoration: 'none', fontSize: '0.9rem' }}>consulting@citricloud.com</a>
          </article>

          <article className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#0ea5e9' }}>school</span>
              <h3 style={{ margin: 0 }}>Training & Support</h3>
            </div>
            <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Team training, workshops, and ongoing support services</p>
            <a href="mailto:support@citricloud.com" style={{ color: '#0ea5e9', textDecoration: 'none', fontSize: '0.9rem' }}>support@citricloud.com</a>
          </article>

          <article className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#0ea5e9' }}>business</span>
              <h3 style={{ margin: 0 }}>Sales</h3>
            </div>
            <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Partnership opportunities and commercial inquiries</p>
            <a href="mailto:sales@citricloud.com" style={{ color: '#0ea5e9', textDecoration: 'none', fontSize: '0.9rem' }}>sales@citricloud.com</a>
          </article>

          <article className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#0ea5e9' }}>rate_review</span>
              <h3 style={{ margin: 0 }}>Feedback</h3>
            </div>
            <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Report a bug, suggest a feature, or share your feedback</p>
            <a href="mailto:feedback@citricloud.com" style={{ color: '#0ea5e9', textDecoration: 'none', fontSize: '0.9rem' }}>feedback@citricloud.com</a>
          </article>
        </div>
      </section>

      {/* Response Times & Support */}
      <section className="section soft">
        <h2 style={{ marginBottom: '32px', textAlign: 'center' }}>Support & Response Times</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          <div style={{ padding: '24px', background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '4px' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#0c3d66' }}>General Inquiry</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#64748b' }}>Non-urgent questions and general requests</p>
            <p style={{ margin: '0', fontSize: '1.1rem', fontWeight: 700, color: '#0ea5e9' }}>24-48 hours</p>
          </div>

          <div style={{ padding: '24px', background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '4px' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#0c3d66' }}>Priority Request</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#64748b' }}>Urgent issues and active engagements</p>
            <p style={{ margin: '0', fontSize: '1.1rem', fontWeight: 700, color: '#0ea5e9' }}>4-8 hours</p>
          </div>

          <div style={{ padding: '24px', background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '4px' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#0c3d66' }}>Emergency Support</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#64748b' }}>Critical production issues (24/7)</p>
            <p style={{ margin: '0', fontSize: '1.1rem', fontWeight: 700, color: '#0ea5e9' }}>1-2 hours</p>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="section soft">
        <h2 style={{ marginBottom: '32px', textAlign: 'center' }}>Our Locations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <article className="card">
            <h3 style={{ margin: '0 0 12px 0' }}>Amsterdam (HQ)</h3>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 8px 0', color: '#64748b' }}>
                <strong>Citricloud</strong><br/>
                Apollostraat 21<br/>
                1077 AB Amsterdam<br/>
                Netherlands
              </p>
            </div>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#64748b' }}>
              <strong>Hours:</strong> Mon-Fri 9:00 AM - 6:00 PM CET
            </p>
            <p style={{ margin: '0', fontSize: '0.85rem', color: '#94a3b8' }}>
              Visits by appointment
            </p>
          </article>

          <article className="card">
            <h3 style={{ margin: '0 0 12px 0' }}>Remote Support</h3>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0', color: '#64748b' }}>
                We support clients worldwide through secure video calls, screen sharing, and collaborative tools.
              </p>
            </div>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#64748b' }}>
              <strong>Coverage:</strong> All major timezones
            </p>
            <p style={{ margin: '0', fontSize: '0.85rem', color: '#94a3b8' }}>
              Schedule a meeting with our team
            </p>
          </article>

          <article className="card">
            <h3 style={{ margin: '0 0 12px 0' }}>Partnership</h3>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0', color: '#64748b' }}>
                Interested in partnering with us? Let's explore collaboration opportunities together.
              </p>
            </div>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#64748b' }}>
              <strong>Contact:</strong> partnerships@citricloud.com
            </p>
            <p style={{ margin: '0', fontSize: '0.85rem', color: '#94a3b8' }}>
              Flexible engagement models
            </p>
          </article>
        </div>
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
          <article className="card">
            <h3>What is your availability for consultations?</h3>
            <p>
              We offer flexible scheduling with availability across most timezones. We typically respond to initial inquiries within 24 hours and can arrange calls at times that work for your team.
            </p>
          </article>
          <article className="card">
            <h3>Do you offer custom training for our team?</h3>
            <p>
              Yes, we offer tailored training programs that fit your specific needs, environment, and skill levels. We can deliver in-person or remotely.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Contact;
