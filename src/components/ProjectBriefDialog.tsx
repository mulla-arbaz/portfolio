import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, MenuIcon } from './Icons';

const WEBHOOK_ENDPOINT =
  import.meta.env.VITE_BRIEF_WEBHOOK_URL ||
  'https://arbazmulla.app.n8n.cloud/webhook/6ddbf314-95bf-4593-bc92-c45fb71bb08a';

export function ProjectBriefDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const openDialog = () => {
    setStatus(null);
    setIsSuccess(false);
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
    const email = String(form.get('email') || '').trim();
    const projectType = String(form.get('projectType') || '').trim();
    const message = String(form.get('message') || '').trim();

    if (!name || !email || !projectType || !message) {
      setStatus({ type: 'error', message: 'Please complete each field before submitting.' });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    const payload = {
      name,
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
            </div>
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
