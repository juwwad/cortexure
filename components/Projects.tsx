export default function Projects() {
  const projects = [
    {
      featured: true,
      gradient: 'linear-gradient(135deg, #0f1c14 0%, #1B4332 40%, #2D6A4F 75%, #1a3a2a 100%)',
      svg: (
        <svg width="180" height="100" viewBox="0 0 180 100" fill="none" opacity="0.25">
          <rect x="20" y="18" width="60" height="5" rx="2.5" fill="white" />
          <rect x="20" y="30" width="90" height="3.5" rx="1.75" fill="white" />
          <rect x="20" y="42" width="72" height="3.5" rx="1.75" fill="white" />
          <rect x="20" y="60" width="40" height="28" rx="5" fill="white" opacity=".12" />
          <rect x="68" y="60" width="40" height="28" rx="5" fill="white" opacity=".12" />
          <rect x="116" y="60" width="44" height="28" rx="5" fill="white" opacity=".08" />
          <circle cx="130" cy="28" r="22" stroke="white" strokeWidth="1.5" opacity=".3" />
          <circle cx="130" cy="28" r="12" stroke="white" strokeWidth="1" opacity=".2" />
          <circle cx="130" cy="28" r="5" fill="white" opacity=".25" />
        </svg>
      ),
      metrics: [
        { val: '99', lbl: 'Perf Score' },
        { val: '3.2×', lbl: 'Conv. Lift' },
        { val: '0.8s', lbl: 'LCP' },
        { val: '$4.2M', lbl: 'ARR Driven' },
      ],
      category: 'Fintech · AI Dashboard · 2024',
      title: 'Vesta Capital Intelligence Platform',
      description:
        'Real-time portfolio analysis with LLM-powered narrative generation and automated regulatory reporting across 14 asset classes.',
    },
    {
      featured: false,
      gradient: 'linear-gradient(135deg, #1a1020 0%, #3d2460 55%, #5a3e8c 100%)',
      svg: (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" opacity="0.25">
          <circle cx="50" cy="50" r="36" stroke="white" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="22" stroke="white" strokeWidth="1" />
          <circle cx="50" cy="50" r="10" stroke="white" strokeWidth="0.75" />
          <circle cx="50" cy="50" r="3.5" fill="white" opacity=".5" />
          <line x1="50" y1="14" x2="50" y2="86" stroke="white" strokeWidth=".75" opacity=".3" />
          <line x1="14" y1="50" x2="86" y2="50" stroke="white" strokeWidth=".75" opacity=".3" />
        </svg>
      ),
      metrics: [
        { val: '84%', lbl: 'AI Accuracy' },
        { val: '12k', lbl: 'Daily Users' },
      ],
      category: 'Health Tech · ML · 2024',
      title: 'Meridian Diagnostics Engine',
      description:
        'Computer vision pipeline for early anomaly detection with 84% clinical precision, deployed in 6 NHS trusts.',
    },
    {
      featured: false,
      gradient: 'linear-gradient(135deg, #181210 0%, #4a2010 50%, #8a3a18 100%)',
      svg: (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" opacity="0.25">
          <rect x="22" y="22" width="24" height="24" rx="4" fill="white" />
          <rect x="54" y="22" width="24" height="24" rx="4" fill="white" opacity=".6" />
          <rect x="22" y="54" width="24" height="24" rx="4" fill="white" opacity=".4" />
          <rect x="54" y="54" width="24" height="24" rx="4" fill="white" opacity=".8" />
        </svg>
      ),
      metrics: [
        { val: '98', lbl: 'Lighthouse' },
        { val: '40%', lbl: 'Ops Saved' },
      ],
      category: 'E-Commerce · Automation · 2023',
      title: 'Bloom Supply Chain OS',
      description:
        'End-to-end inventory intelligence with predictive ordering, reducing manual operations by 40% and achieving zero downtime over 18 months.',
    },
  ];

  return (
    <section id="projects">
      <p className="section-label reveal">Selected work</p>
      <h2 className="section-title reveal delay1">
        Products we've
        <br />
        shipped.
      </h2>
      <p className="section-sub reveal delay2">
        A curated selection of recent engagements. Hover to reveal performance metrics and
        engineering outcomes.
      </p>

      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`project-card reveal ${project.featured ? 'featured' : `delay${idx}`}`}
          >
            <div
              className="project-thumb"
              style={{
                backgroundImage: project.gradient,
                backgroundSize: 'cover',
              }}
            >
              <div
                className="project-thumb-visual"
                style={{ background: project.gradient }}
              >
                {project.svg}
              </div>
              <div className="project-overlay">
                <div className="project-metrics">
                  {project.metrics.map((metric, midx) => (
                    <div key={midx} className="metric">
                      <div className="metric-val">{metric.val}</div>
                      <div className="metric-lbl">{metric.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="project-body">
              <div className="project-cat">{project.category}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
