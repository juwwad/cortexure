'use client';

import { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { usePathname } from 'next/navigation';
import { sectionHref } from '@/lib/site';

// The site is a static export (`output: "export"`), so there is no server
// runtime to host an API route. Instead the form posts to an endpoint supplied
// at build time. When no endpoint is configured the form refuses to pretend it
// sent anything and points the visitor at a real contact address.
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? '';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '';

const REQUIRED_FIELD_LABELS: Record<string, string> = {
  'term-main': 'a project description',
  't-name': 'your name',
  't-email': 'your email address',
};

const formatList = (items: string[]) =>
  items.length < 2
    ? items.join('')
    : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

export default function Footer() {
  const pathname = usePathname();
  const [projectIdea, setProjectIdea] = useState('');
  const [expandForm, setExpandForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Focus has to wait for the re-render that removes `inert` from the panel;
  // calling `.focus()` on an inert element is a no-op.
  const pendingFocusRef = useRef<string | null>(null);

  useEffect(() => {
    if (pendingFocusRef.current) {
      document.getElementById(pendingFocusRef.current)?.focus();
      pendingFocusRef.current = null;
    }
  }, [invalidFields]);

  // Validation feedback is derived from `invalidFields` rather than stored as a
  // string, so it disappears as soon as the visitor fills the last empty field.
  const validationMessage =
    invalidFields.length === 0
      ? ''
      : `Please fill in ${formatList(invalidFields.map((id) => REQUIRED_FIELD_LABELS[id]))}.`;
  const formMessage = error || validationMessage;

  const isInvalid = (id: string) => invalidFields.includes(id);

  const clearInvalid = (id: string) =>
    setInvalidFields((prev) => prev.filter((field) => field !== id));

  const handleIdeaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProjectIdea(value);
    setSubmitted(false);
    setError('');
    clearInvalid('term-main');
    if (value.trim().length > 6) {
      setExpandForm(true);
    } else {
      setExpandForm(false);
      // The panel (and the message inside it) is hidden while collapsed, so
      // any pending field errors would be clipped to nothing and left
      // attributed to unreachable inputs. Drop them; the next submit
      // re-validates from scratch.
      setInvalidFields([]);
    }
  };

  const handleIdeaKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && projectIdea.trim().length > 6) {
      setExpandForm(true);
      setTimeout(() => {
        document.getElementById('t-name')?.focus();
      }, 0);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace('t-', '')]: value,
    }));
    clearInvalid(id);
  };

  const handleSubmit = async () => {
    const { name, email } = formData;

    const missing = [
      !projectIdea.trim() && 'term-main',
      !name.trim() && 't-name',
      !email.trim() && 't-email',
    ].filter((id): id is string => Boolean(id));

    if (missing.length > 0) {
      setError('');
      setInvalidFields(missing);
      setExpandForm(true);
      pendingFocusRef.current = missing[0];
      return;
    }

    setInvalidFields([]);

    if (!CONTACT_ENDPOINT) {
      setError(
        CONTACT_EMAIL
          ? `This form isn't connected yet — email us directly at ${CONTACT_EMAIL}.`
          : "This form isn't connected yet — please reach out to us directly and we'll pick it up from there.",
      );
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...formData, projectIdea }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setSubmitted(true);
    } catch {
      setError(
        CONTACT_EMAIL
          ? `We couldn't send that. Please try again, or email us at ${CONTACT_EMAIL}.`
          : "We couldn't send that. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact">
      <div className="footer-inner">
        <p className="footer-label reveal">Start a project</p>
        <h2 className="footer-title reveal delay1">
          Let&apos;s build something
          <br />
          <span className="dim">worth shipping.</span>
        </h2>

        <div className="terminal reveal delay2">
          <div className="term-header">
            <div className="term-dots">
              <div className="term-dot" style={{ background: '#FF5F57' }}></div>
              <div className="term-dot" style={{ background: '#FEBC2E' }}></div>
              <div className="term-dot" style={{ background: '#28C840' }}></div>
            </div>
            <span className="term-title">Axiom Inc. — project intake v1.0</span>
          </div>
          <div className="term-row">
            <span className="term-prompt-char">›</span>
            <input
              className="term-input"
              id="term-main"
              aria-label="Describe your project idea"
              aria-invalid={isInvalid('term-main') || undefined}
              aria-describedby={formMessage ? 'term-form-message' : undefined}
              placeholder="Describe your project idea..."
              autoComplete="off"
              value={projectIdea}
              onChange={handleIdeaChange}
              onKeyDown={handleIdeaKeyDown}
            />
          </div>
          {/* While collapsed the panel is only hidden visually, so its controls
              stay tabbable and exposed to assistive tech. `inert` removes the
              subtree from both the tab order and the accessibility tree; the
              matching `aria-hidden` covers browsers without `inert` support.
              React 19 treats `inert` as a first-class boolean attribute, so it
              must be passed as `true`; the empty string is rejected and dropped. */}
          <form
            className={`term-expand ${expandForm ? 'open' : ''}`}
            id="term-expand"
            aria-hidden={!expandForm}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            {...(expandForm ? {} : ({ inert: true } as unknown as HTMLAttributes<HTMLFormElement>))}
          >
            <div className="term-field">
              <label htmlFor="t-name">Your name</label>
              <input
                id="t-name"
                placeholder="e.g. Jordan Avery"
                aria-invalid={isInvalid('t-name') || undefined}
                aria-describedby={formMessage ? 'term-form-message' : undefined}
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
            <div className="term-field">
              <label htmlFor="t-email">Email address</label>
              <input
                id="t-email"
                type="email"
                placeholder="you@company.com"
                aria-invalid={isInvalid('t-email') || undefined}
                aria-describedby={formMessage ? 'term-form-message' : undefined}
                value={formData.email}
                onChange={handleFormChange}
              />
            </div>
            <div className="term-field">
              <label htmlFor="t-service">Service needed</label>
              <select
                id="t-service"
                value={formData.service}
                onChange={handleFormChange}
              >
                <option value="">Select a service...</option>
                <option>Web Development</option>
                <option>AI Engineering</option>
                <option>Design System</option>
                <option>Full Product Build</option>
              </select>
            </div>
            <div className="term-field">
              <label htmlFor="t-budget">Budget range</label>
              <input
                id="t-budget"
                placeholder="e.g. $20–50k, open to discuss"
                value={formData.budget}
                onChange={handleFormChange}
              />
            </div>
            <div className="term-actions">
              <button
                type="submit"
                className="term-btn"
                disabled={isSubmitting || submitted}
              >
                {isSubmitting ? 'Sending...' : 'Send brief'} <span>→</span>
              </button>
              <span className="term-hint">We respond within 24 hours</span>
            </div>
            {submitted && (
              <div className="term-success" role="status" style={{ display: 'flex' }}>
                <span className="term-success-icon">✓</span>
                Received. We&apos;ll be in touch within 24 hours.
              </div>
            )}
            {formMessage && (
              <div className="term-error" id="term-form-message" role="alert">
                <span aria-hidden="true">!</span>
                {formMessage}
              </div>
            )}
          </form>
        </div>

        {/* Footer columns */}
        <div className="footer-grid">
          <div className="footer-logo-block">
            <div className="footer-logo-text">Axiom Inc.</div>
            <p>
              AI Engineering x Premium Web Development. Building products that matter, with
              craft that endures.
            </p>
            <p className="footer-copy">© {new Date().getFullYear()} Axiom Inc. Studio. All rights reserved.</p>
          </div>
          <div className="footer-col">
            <h3>Studio</h3>
            <a href={sectionHref(pathname, 'services')}>Services</a>
            <a href={sectionHref(pathname, 'projects')}>Work</a>
            <a href={sectionHref(pathname, 'about')}>About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
