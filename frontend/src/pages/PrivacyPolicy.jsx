function PrivacyPolicy() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>We protect your data and respect your privacy.</h1>
            <p>Learn how we collect, use, and safeguard information.</p>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="list">
          <article className="card">
            <h3>Information we collect</h3>
            <p>Contact details, usage analytics, and support communications.</p>
          </article>
          <article className="card">
            <h3>How we use data</h3>
            <p>Provide services, improve performance, and deliver support.</p>
          </article>
          <article className="card">
            <h3>Data retention</h3>
            <p>We retain data only as long as necessary for service delivery and compliance.</p>
          </article>
          <article className="card">
            <h3>Your rights</h3>
            <p>Access, correction, deletion, and portability requests are supported.</p>
          </article>
        </div>
      </section>

      <section className="section soft">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Data protection</h2>
        <div className="list">
          <article className="card">
            <h3>Security safeguards</h3>
            <p>Encryption in transit and at rest with strict access controls.</p>
          </article>
          <article className="card">
            <h3>International transfers</h3>
            <p>Standard contractual clauses and regional data processing.</p>
          </article>
          <article className="card">
            <h3>Sub-processors</h3>
            <p>Transparent list of vendors supporting our services.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
