// The running keyword strip under the hero. Keywords are limited to the stack
// this site actually uses — earlier drafts listed tools we do not run
// (Supabase, Framer Motion, Edge Functions, Vercel) and were removed.
const KEYWORDS = [
  'Next.js 15',
  'AI Engineering',
  'Design Systems',
  'LLM Integration',
  'RAG Pipelines',
  'TypeScript',
  'React',
  'Static Export',
  'Computer Vision',
  'Accessibility',
];

export default function Marquee() {
  // The list is rendered twice so the -50% translation loops seamlessly.
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {[...KEYWORDS, ...KEYWORDS].map((word, idx) => (
          <span className="marquee-item" key={idx}>
            <span className="marquee-dot"></span>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
