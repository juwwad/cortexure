'use client';

import { useState, type HTMLAttributes } from 'react';

export default function Footer() {
  const [projectIdea, setProjectIdea] = useState('');
  const [expandForm, setExpandForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIdeaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProjectIdea(value);
    if (value.trim().length > 6) {
      setExpandForm(true);
    } else {
      setExpandForm(false);
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
  };

  const handleSubmit = async () => {
    const { name, email } = formData;

    if (!projectIdea.trim() || !name.trim() || !email.trim()) {
      // Highlight empty fields
      const fields = ['term-main', 't-name', 't-email'];
      fields.forEach((id) => {
        const el = document.getElementById(id) as HTMLInputElement;
        if (el && !el.value.trim()) {
          el.style.borderColor = 'rgba(255,80,80,0.5)';
          setTimeout(() => {
            el.style.borderColor = '';
          }, 1500);
        }
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form after 2 seconds
      setTimeout(() => {
        setProjectIdea('');
        setFormData({ name: '', email: '', service: '', budget: '' });
        setExpandForm(false);
        setSubmitted(false);
      }, 2000);
    }, 1000);
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
              React 18 does not serialise the boolean `inert` prop, so it is
              passed as an empty string through a cast. */}
          <div
            className={`term-expand ${expandForm ? 'open' : ''}`}
            id="term-expand"
            aria-hidden={!expandForm}
            {...(expandForm ? {} : ({ inert: '' } as unknown as HTMLAttributes<HTMLDivElement>))}
          >
            <div className="term-field">
              <label htmlFor="t-name">Your name</label>
              <input
                id="t-name"
                placeholder="e.g. Sarah Chen"
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
                className="term-btn"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send brief'} <span>→</span>
              </button>
              <span className="term-hint">We respond within 24 hours</span>
            </div>
            {submitted && (
              <div className="term-success" style={{ display: 'flex' }}>
                <span className="term-success-icon">✓</span>
                Received. We&apos;ll be in touch within 24 hours.
              </div>
            )}
          </div>
        </div>

        {/* Footer columns */}
        <div className="footer-grid">
          <div className="footer-logo-block">
            <div className="footer-logo-text">Axiom Inc.</div>
            <p>
              AI Engineering x Premium Web Development. Building products that matter, with
              craft that endures.
            </p>
            <p className="footer-copy">© 2025 Axiom Inc. Studio. All rights reserved.</p>
          </div>
          <div className="footer-col">
            <h5>Studio</h5>
            <a href="#services">Services</a>
            <a href="#projects">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-col">
            <h5>Connect</h5>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
              Dribbble
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter / X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
