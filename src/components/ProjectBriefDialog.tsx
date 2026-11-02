import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, MenuIcon } from './Icons';

const WEBHOOK_ENDPOINT =
  import.meta.env.VITE_BRIEF_WEBHOOK_URL ||
  'https://mullaarbaz.app.n8n.cloud/webhook/production-path';

// Official Google reCAPTCHA v2 Site Key
const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  '6LfD0wwuAAAAABUVwrVuIkschpHdMF2cId8tdnE5';

export function ProjectBriefDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(true);

  const openDialog = () => {
    setStatus(null);
    setIsSuccess(false);
    setRecaptchaToken('');
    if (widgetIdRef.current !== null && window.grecaptcha) {
      try {
        window.grecaptcha.reset(widgetIdRef.current);
      } catch (err) {
        console.warn('reCAPTCHA reset:', err);
      }
    }
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

  // Initialize official Google reCAPTCHA v2 widget
  useEffect(() => {
    if (isSuccess) return;

    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !recaptchaContainerRef.current) return;
      if (recaptchaContainerRef.current.hasChildNodes()) {
        setIsRecaptchaLoading(false);
        return;
      }

      if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
        try {
          const id = window.grecaptcha.render(recaptchaContainerRef.current, {
            sitekey: RECAPTCHA_SITE_KEY,
            callback: (token: string) => {
              if (isMounted) {
                setRecaptchaToken(token);
                setStatus((current) =>
                  current?.type === 'error' && current.message.toLowerCase().includes('recaptcha')
                    ? null
                    : current,
                );
              }
            },
            'expired-callback': () => {
              if (isMounted) setRecaptchaToken('');
            },
            'error-callback': () => {
              if (isMounted) setRecaptchaToken('');
            },
          });
          widgetIdRef.current = id;
          if (isMounted) setIsRecaptchaLoading(false);
        } catch (err) {
          console.warn('reCAPTCHA render error:', err);
          if (isMounted) setIsRecaptchaLoading(false);
        }
      }
    };

    if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
      if (window.grecaptcha.ready) {
        window.grecaptcha.ready(renderWidget);
      } else {
        renderWidget();
      }
    } else {
      const checkInterval = setInterval(() => {
        if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
          clearInterval(checkInterval);
          renderWidget();
        }
      }, 150);

      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
        if (isMounted) setIsRecaptchaLoading(false);
      }, 6000);

      return () => {
        isMounted = false;
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [isSuccess]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const projectType = String(form.get('projectType') || '').trim();
    const details = String(form.get('details') || '').trim();
    const budget = String(form.get('budget') || '').trim();
    const timeline = String(form.get('timeline') || '').trim();

    if (!name || !email || !projectType || !details) {
      setStatus({ type: 'error', message: 'Please complete all required fields before submitting.' });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!recaptchaToken) {
      setStatus({ type: 'error', message: 'Please complete the reCAPTCHA verification before submitting.' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    // Build formatted message including project details and optional budget/timeline
    // This ensures full visibility in existing Google Sheets and email notifications
    const messageParts = [details];
    if (budget) {
      messageParts.push(`Estimated Budget: ${budget}`);
    }
    if (timeline) {
      messageParts.push(`Expected Timeline: ${timeline}`);
    }
    const formattedMessage = messageParts.join('\n\n');

    const payload = {
      name,
      email,
      projectType,
      message: formattedMessage,
      details,
      budget: budget || 'Not specified',
      timeline: timeline || 'Not specified',
      submittedAt: new Date().toISOString(),
      recaptchaToken,
      'g-recaptcha-response': recaptchaToken,
      fullName: name,
      emailAddress: email,
      projectDetails: details,
      estimatedBudget: budget || 'Not specified',
      expectedTimeline: timeline || 'Not specified',
      'Your Name': name,
      'Your Email': email,
      'Project Type': projectType,
      'Project Details': details,
      'Estimated Budget': budget || 'Not specified',
      'Expected Timeline': timeline || 'Not specified',
      'A little more about project': formattedMessage,
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
      setRecaptchaToken('');
    } catch (error) {
      console.error('Project brief submission failed:', error);
      setStatus({
        type: 'error',
        message: 'Unable to send your brief right now. Please try again or reach out directly.',
      });
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
          setRecaptchaToken('');
        } catch (err) {
          console.warn('reCAPTCHA reset failed:', err);
        }
      }
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
                  setRecaptchaToken('');
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
                <span>Full Name <span className="field-required" aria-hidden="true">*</span></span>
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={80}
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
              </label>
              <label>
                <span>Email Address <span className="field-required" aria-hidden="true">*</span></span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={120}
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                />
              </label>
            </div>

            <label>
              <span>Project Type <span className="field-required" aria-hidden="true">*</span></span>
              <select name="projectType" defaultValue="" required disabled={isSubmitting}>
                <option value="" disabled>Select project type</option>
                <option value="Landing Page Development">Landing Page Development</option>
                <option value="Business Website Development">Business Website Development</option>
                <option value="Custom Website Development">Custom Website Development</option>
                <option value="WordPress Development">WordPress Development</option>
                <option value="Website Redesign">Website Redesign</option>
                <option value="Website Maintenance & Support">Website Maintenance & Support</option>
                <option value="Frontend Development (React)">Frontend Development (React)</option>
                <option value="Figma to Website Development">Figma to Website Development</option>
                <option value="Other / Not Sure Yet">Other / Not Sure Yet</option>
              </select>
            </label>

            <div className="form-grid">
              <label>
                <span>Estimated Budget <span className="field-optional">(Optional)</span></span>
                <select name="budget" defaultValue="" disabled={isSubmitting}>
                  <option value="">Select estimated budget</option>
                  <option value="₹15,000 – ₹25,000">₹15,000 – ₹25,000</option>
                  <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                  <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                  <option value="₹1,00,000+">₹1,00,000+</option>
                  <option value="Not Sure Yet">Not Sure Yet</option>
                </select>
              </label>
              <label>
                <span>Expected Timeline <span className="field-optional">(Optional)</span></span>
                <select name="timeline" defaultValue="" disabled={isSubmitting}>
                  <option value="">Select expected timeline</option>
                  <option value="Immediately">Immediately</option>
                  <option value="Within 1–2 Weeks">Within 1–2 Weeks</option>
                  <option value="Within 1 Month">Within 1 Month</option>
                  <option value="Within 2–3 Months">Within 2–3 Months</option>
                  <option value="Just Exploring">Just Exploring</option>
                </select>
              </label>
            </div>

            <label>
              <span>Project Details <span className="field-required" aria-hidden="true">*</span></span>
              <textarea
                name="details"
                rows={4}
                required
                maxLength={1500}
                placeholder="Tell me a little about your project, goals, required features or any reference websites you have in mind..."
                disabled={isSubmitting}
              />
            </label>

            <div className="recaptcha-wrapper" aria-label="Google reCAPTCHA verification">
              <div ref={recaptchaContainerRef} />
              {isRecaptchaLoading && (
                <div className="recaptcha-loading">
                  <span>Loading reCAPTCHA verification...</span>
                </div>
              )}
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
