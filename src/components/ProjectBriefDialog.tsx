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

  // Math Captcha state
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userCaptcha, setUserCaptcha] = useState('');

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserCaptcha('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const openDialog = () => {
    setStatus(null);
    setIsSuccess(false);
    generateCaptcha();
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

    if (parseInt(userCaptcha.trim(), 10) !== num1 + num2) {
      setStatus({ type: 'error', message: 'Incorrect captcha answer. Please try again.' });
      generateCaptcha();
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
      generateCaptcha();
    } catch (error) {
      console.error('Project brief submission failed:', error);
      setStatus({
        type: 'error',
        message: 'Unable to send your brief right now. Please try again or reach out directly.',
      });
      generateCaptcha();
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
                  generateCaptcha();
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
            <div className="captcha-group">
              <label htmlFor="captcha-input">
                Security verification: What is {num1} + {num2}?
              </label>
              <div className="captcha-input-wrapper">
                <input
                  id="captcha-input"
                  name="captcha"
                  type="number"
                  required
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  placeholder="Enter answer"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="button button--secondary captcha-refresh-btn"
                  onClick={generateCaptcha}
                  disabled={isSubmitting}
                  title="Refresh security question"
                >
                  Refresh
                </button>
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



