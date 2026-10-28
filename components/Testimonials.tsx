export default function Testimonials() {
  // Axiom Inc is pre-launch. Rather than attribute quotes to invented people or
  // clients, this section states commitments we can stand behind today.
  const commitments = [
    {
      quote:
        'We scope in the open. You see the plan, the tradeoffs, and the estimate before a single line of code is written.',
      title: 'Honest scoping',
      detail: 'No padded timelines',
      initials: '01',
      bgColor: '#D8F3DC',
      textColor: '#1B4332',
    },
    {
      quote:
        'One senior team, start to finish. The people who design the system are the people who build and ship it.',
      title: 'Direct engineering',
      detail: 'No handoffs to juniors',
      initials: '02',
      bgColor: '#EDE9FE',
      textColor: '#4C1D95',
    },
    {
      quote:
        'We hand over work you can own: documented, tested, and explained well enough for your team to extend it.',
      title: 'Built to hand off',
      detail: 'Documented and tested',
      initials: '03',
      bgColor: '#FEF3C7',
      textColor: '#92400E',
    },
  ];

  return (
    <div className="testimonials">
      <div className="testimonials-inner">
        <p className="section-label reveal">How we work</p>
        <h2 className="section-title reveal delay1">What we commit to.</h2>
        <div className="testimonials-grid">
          {commitments.map((commitment, idx) => (
            <div key={idx} className={`testimonial reveal delay${idx + 1}`}>
              <p className="testimonial-quote">{commitment.quote}</p>
              <div className="testimonial-author">
                <div
                  className="author-avatar"
                  style={{
                    background: commitment.bgColor,
                    color: commitment.textColor,
                  }}
                >
                  {commitment.initials}
                </div>
                <div>
                  <div className="author-name">{commitment.title}</div>
                  <div className="author-role">{commitment.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
