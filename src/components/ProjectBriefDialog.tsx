import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, MenuIcon } from './Icons';

const WEBHOOK_ENDPOINT =
  import.meta.env.VITE_BRIEF_WEBHOOK_URL ||
  'https://arbazm.app.n8n.cloud/webhook/prod-90909898-path';

export function ProjectBriefDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRobotChecked, setIsRobotChecked] = useState(false);

  const openDialog = () => {
    setStatus(null);
    setIsSuccess(false);
    setIsRobotChecked(false);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) closeDialog();
    };

    dialog.addEventListener('click', handleBackdrop);
    return () => dialog.removeEventListener('click', handleBackdrop);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get('name') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const email = String(form.get('email') || '').trim();
    const projectType = String(form.get('projectType') || '').trim();
    const message = String(form.get('message') || '').trim();

    if (!name || !phone || !email || !projectType || !message) {
      setStatus({ type: 'error', message: 'Please complete each field before submitting.' });
      return;
    }

    const phonePattern = /^[+\d\s()-]{7,20}$/;
    if (!phonePattern.test(phone)) {
      setStatus({ type: 'error', message: 'Please enter a valid mobile number.' });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!isRobotChecked) {
      setStatus({ type: 'error', message: 'Please confirm that you are not a robot.' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    const payload = {
      name,
      phone,
      email,
      projectType,
      message,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(WEBHOOK_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Webhook response error:', response.status, errorData);
        throw new Error(errorData?.message || `Server returned status ${response.status}`);
      }

      setIsSuccess(true);
      setStatus({
        type: 'success',
        message: 'Thank you! Your project brief has been sent successfully. I will get back to you shortly.',
      });
      formElement.reset();
      setIsRobotChecked(false);
    } catch (error) {
      console.error('Project brief submission failed:', error);
      setStatus({
        type: 'error',
        message: 'Unable to send your brief right now. Please try again or reach out directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button className="button button--dark" type="button" onClick={openDialog}>
        Start a project <ArrowUpRight />
      </button>

      <dialog className="brief-dialog" ref={dialogRef} aria-labelledby="brief-title">
        <div className="brief-dialog__top">
          <p className="section-heading__eyebrow"><span aria-hidden="true" />Project brief</p>
          <button className="icon-button" type="button" onClick={closeDialog} aria-label="Close project brief">
            <MenuIcon open />
          </button>
        </div>
        <div className="brief-dialog__intro">
          <h2 id="brief-title">Tell me what you’re building.</h2>
          <p>Complete a short brief to send it directly. I’ll review your project details and get back to you shortly.</p>
        </div>

        {isSuccess ? (
          <div className="brief-dialog__success" role="status">
            <p className="form-status form-status--success">{status?.message}</p>
            <div className="brief-dialog__actions">
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  setIsSuccess(false);
                  setStatus(null);
                  setIsRobotChecked(false);
                }}
              >
                Send another brief
              </button>
              <button type="button" className="button button--text" onClick={closeDialog}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={80}
                  placeholder="Name"
                  disabled={isSubmitting}
                />
              </label>
              <label>
                Mobile number
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  maxLength={20}
                  placeholder="+91 98765 43210"
                  disabled={isSubmitting}
                />
              </label>
            </div>
            <div className="form-grid">
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={120}
                  placeholder="you@company.com"
                  disabled={isSubmitting}
                />
              </label>
              <label>
                Project type
                <select name="projectType" defaultValue="" required disabled={isSubmitting}>
                  <option value="" disabled>Select a project type</option>
                  <option>New website</option>
                  <option>WordPress improvement</option>
                  <option>Frontend development</option>
                  <option>Performance optimization</option>
                </select>
              </label>
            </div>
            <label>
              A little about the project
              <textarea
                name="message"
                rows={4}
                required
                maxLength={1200}
                placeholder="Goals, timeline and what needs improving..."
                disabled={isSubmitting}
              />
            </label>
            <div className="robot-captcha-card">
              <label className="robot-captcha-checkbox-label" htmlFor="robot-verification">
                <input
                  id="robot-verification"
                  name="robotVerification"
                  type="checkbox"
                  checked={isRobotChecked}
                  onChange={(e) => setIsRobotChecked(e.target.checked)}
                  disabled={isSubmitting}
                  required
                />
                <span>I'm not a robot</span>
              </label>
              <div className="robot-captcha-badge" aria-hidden="true">
                <svg viewBox="0 0 48 48" width="28" height="28">
                  <path
                    d="M24 4C12.95 4 4 12.95 4 24c0 4.14 1.27 8 3.43 11.2L10.3 33c-1.46-2.58-2.3-5.54-2.3-8.7 0-8.84 7.16-16 16-16 4.42 0 8.42 1.79 11.31 4.69l-4.69 4.69H42V6l-4.73 4.73C33.68 7.14 29.07 4 24 4z"
                    fill="#1A73E8"
                  />
                  <path
                    d="M44 24c0 11.05-8.95 20-20 20-4.14 0-8-1.27-11.2-3.43l2.2-2.87C17.58 39.16 20.54 40 23.7 40c8.84 0 16-7.16 16-16 0-4.42-1.79-8.42-4.69-11.31l4.69-4.69H28v11l4.73-4.73C36.32 17.68 44 21.07 44 24z"
                    fill="#4285F4"
                    opacity="0.8"
                  />
                </svg>
                <span className="robot-captcha-badge-title">reCAPTCHA</span>
                <span className="robot-captcha-badge-links">Privacy - Terms</span>
              </div>
            </div>
            {status && (
              <p className={`form-status form-status--${status.type}`} role="status">
                {status.message}
              </p>
            )}
            <div className="brief-dialog__actions">
              <button type="submit" className="button button--primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send project brief'} <ArrowUpRight />
              </button>
              <button type="button" className="button button--text" onClick={closeDialog} disabled={isSubmitting}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}



