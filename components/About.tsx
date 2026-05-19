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

  const stats = [
    { num: '48', desc: 'Products shipped' },
    { num: '6', desc: 'Years operating' },
    { num: '100%', desc: 'Client retention' },
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
              Cortexture was founded on a simple conviction: the best digital products emerge
              when rigorous engineering and precise design share the same first-principles
              foundation.
            </p>
            <p style={{ marginTop: '1rem' }}>
              We operate as a focused team — no bloat, no middle layers. Senior engineers and
              designers work directly on every engagement, delivering higher quality output and
              faster iteration cycles than agencies four times our size.
            </p>
          </div>
          <div className="stat-row reveal delay3">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat">
                <span className="stat-num">{stat.num}</span>
                <span className="stat-desc">{stat.desc}</span>
              </div>
            ))}
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
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
