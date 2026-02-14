function CookiePolicy() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>How we use cookies on Citricloud.</h1>
            <p>We use cookies to improve performance, security, and analytics.</p>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="list">
          <article className="card">
            <h3>Essential cookies</h3>
            <p>Required for authentication, security, and core functionality.</p>
          </article>
          <article className="card">
            <h3>Analytics cookies</h3>
            <p>Help us understand usage and improve product experience.</p>
          </article>
          <article className="card">
            <h3>Preference controls</h3>
            <p>You can opt out of non-essential cookies through browser settings.</p>
          </article>
        </div>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Manage preferences</h2>
        <div className="list">
          <article className="card">
            <h3>Cookie banner</h3>
            <p>Update your preferences at any time from the footer.</p>
          </article>
          <article className="card">
            <h3>Browser settings</h3>
            <p>Control cookies through your browser privacy options.</p>
          </article>
          <article className="card">
            <h3>Support requests</h3>
            <p>Contact us to review or delete cookie data.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default CookiePolicy;
