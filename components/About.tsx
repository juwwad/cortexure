export default function About() {
  const values = [
    {
      mark: '◈',
      title: 'First Principles',
      description:
        'We solve from the ground up, never copying patterns without understanding their tradeoffs and costs.',
    },
    {
      mark: '⬡',
      title: 'Systems Thinking',
      description:
        'Every decision is made with the whole product in mind — components, data flows, and users in equilibrium.',
    },
    {
      mark: '△',
      title: 'Precision Craft',
      description:
        'We obsess over the details others skip — typography, animation timing, API response shapes, error states.',
    },
    {
      mark: '○',
      title: 'Radical Clarity',
      description:
        'Clear scope, honest timelines, and direct communication at every stage of the engagement. No surprises.',
    },
  ];

  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-copy">
          <p className="section-label reveal">Who we are</p>
          <h2 className="section-title reveal delay1">
            Engineering
            <br />
            excellence,
            <br />
            by design.
          </h2>
          <div className="reveal delay2">
            <p>
              Axiom Inc was founded on a simple conviction: the best digital products emerge
              when rigorous engineering and precise design share the same first-principles
              foundation.
            </p>
            <p style={{ marginTop: '1rem' }}>
              We operate as a focused team — no bloat, no middle layers. Senior engineers and
              designers work directly on every engagement, so iteration stays fast and
              communication stays direct.
            </p>
          </div>
          <div className="reveal delay3">
            <p>
              We are an early-stage studio, so this site intentionally avoids invented
              client logos, headcount, and performance numbers. The work below shows the
              kind of systems we build.
            </p>
          </div>
          <div className="reveal delay4">
            <a href="#contact" className="btn-primary" style={{ display: 'inline-flex' }}>
              Work with us →
            </a>
          </div>
        </div>

        <div className="values-grid reveal delay2">
          {values.map((value, idx) => (
            <div key={idx} className="value-card">
              <span className="value-mark">{value.mark}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
