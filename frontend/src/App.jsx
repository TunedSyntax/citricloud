import { useEffect, useState } from "react";

const features = [
  "Edge-first deployments",
  "Observability out of the box",
  "Multi-tenant friendly",
  "Kubernetes-ready"
];

function App() {
  const [status, setStatus] = useState("Checking API...");

  useEffect(() => {
    let isActive = true;

    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (isActive) {
          setStatus(data.status || "OK");
        }
      })
      .catch(() => {
        if (isActive) {
          setStatus("API unavailable");
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="page">
      <header className="hero">
        <div className="badge">Citricloud Platform</div>
        <h1>Build fast, deploy anywhere.</h1>
        <p>
          Citricloud is a modern stack starter for teams shipping web apps on
          Kubernetes with confidence.
        </p>
        <div className="cta-row">
          <button className="primary">Start a project</button>
          <button className="ghost">See docs</button>
        </div>
        <div className="api-status">API: {status}</div>
      </header>

      <section className="grid">
        {features.map((feature) => (
          <article key={feature} className="card">
            <h3>{feature}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit
              amet justo vel neque viverra finibus.
            </p>
          </article>
        ))}
      </section>

      <section className="split">
        <div>
          <h2>Deploy with confidence</h2>
          <p>
            Bring your own cloud and keep full control. Citricloud gives you a
            production-ready baseline with sensible defaults and room to grow.
          </p>
        </div>
        <div className="panel">
          <div className="panel-title">Live signals</div>
          <ul>
            <li>Active regions: 3</li>
            <li>Services running: 12</li>
            <li>Release pipeline: green</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
