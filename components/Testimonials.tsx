export default function Testimonials() {
  const testimonials = [
    {
      quote:
        '"Cortexture delivered a product that our entire engineering team is proud of. The quality and attention to detail was beyond anything we\'d seen from an agency."',
      name: 'Sarah Chen',
      role: 'CTO, Vesta Capital',
      initials: 'SC',
      bgColor: '#D8F3DC',
      textColor: '#1B4332',
    },
    {
      quote:
        '"They\'re the rare team that can speak both design language and machine learning fluently. That combination is incredibly hard to find, and it showed in the results."',
      name: 'Marcus Kovács',
      role: 'VP Product, Meridian Health',
      initials: 'MK',
      bgColor: '#EDE9FE',
      textColor: '#4C1D95',
    },
    {
      quote:
        '"Six months in, zero downtime, and our operations team saved 40% of their time. The ROI was evident within the first quarter after launch."',
      name: 'Aisha Laurent',
      role: 'COO, Bloom Commerce',
      initials: 'AL',
      bgColor: '#FEF3C7',
      textColor: '#92400E',
    },
  ];

  return (
    <div className="testimonials">
      <div className="testimonials-inner">
        <p className="section-label reveal">Client voices</p>
        <h2 className="section-title reveal delay1">What our clients say.</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className={`testimonial reveal delay${idx + 1}`}>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div
                  className="author-avatar"
                  style={{
                    background: testimonial.bgColor,
                    color: testimonial.textColor,
                  }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
