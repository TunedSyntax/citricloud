function TermsOfService() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="badge">Service Terms</div>
            <h1>Clear, fair terms for using Citricloud services.</h1>
            <p>These terms outline responsibilities, usage, and limitations.</p>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="list">
          <article className="card">
            <h3>Service access</h3>
            <p>Accounts must be maintained accurately and secured by your team.</p>
          </article>
          <article className="card">
            <h3>Acceptable use</h3>
            <p>Customers agree to lawful use and respect platform security controls.</p>
          </article>
          <article className="card">
            <h3>Liability</h3>
            <p>We outline service limits and remedies in case of issues.</p>
          </article>
          <article className="card">
            <h3>Termination</h3>
            <p>Either party may terminate with notice as defined in contracts.</p>
          </article>
        </div>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Service levels</h2>
        <div className="list">
          <article className="card">
            <h3>Availability targets</h3>
            <p>Uptime commitments and incident response windows.</p>
          </article>
          <article className="card">
            <h3>Support hours</h3>
            <p>Defined coverage based on your support tier.</p>
          </article>
          <article className="card">
            <h3>Change management</h3>
            <p>Notification timelines and maintenance schedules.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default TermsOfService;
