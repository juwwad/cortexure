export default function Services() {
  const services = [
    {
      num: '01',
      icon: '⬡',
      title: 'Web Development',
      description:
        'Production-grade Next.js applications. Server components, edge rendering, and architecture that scales with your ambition without compromising developer experience.',
      tags: ['Next.js 15', 'TypeScript', 'Supabase', 'Edge Functions', 'Vercel'],
    },
    {
      num: '02',
      icon: '◈',
      title: 'AI Engineering',
      description:
        'Intelligent systems built with precision. LLM integration, RAG pipelines, computer vision, and agentic workflows — all grounded in measurable outcomes, not hype.',
      tags: ['LLM APIs', 'RAG', 'Agents', 'ML Ops', 'Fine-tuning'],
    },
    {
      num: '03',
      icon: '◻',
      title: 'Design Systems',
      description:
        'Premium UI/UX rooted in systems thinking. Design tokens, component libraries, and brand identities that remain coherent and recognizable at any scale.',
      tags: ['Figma', 'Design Tokens', 'Motion', 'Branding', 'Accessibility'],
    },
  ];

  return (
    <section id="services">
      <p className="section-label reveal">What we build</p>
      <h2 className="section-title reveal delay1">
        Three pillars.
        <br />
        One vision.
      </h2>
      <p className="section-sub reveal delay2">
        Specialized expertise across the full digital product lifecycle — from intelligent
        systems to pixel-perfect interfaces that convert.
      </p>

      <div className="bento">
        {services.map((service, idx) => (
          <div key={idx} className={`service-card reveal delay${idx + 1}`}>
            <div className="service-num">{service.num}</div>
            <div className="service-icon-wrap">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="service-tags">
              {service.tags.map((tag, tidx) => (
                <span key={tidx} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
