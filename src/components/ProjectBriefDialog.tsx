import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, MenuIcon } from './Icons';

export function ProjectBriefDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState('');

  const openDialog = () => {
    setStatus('');
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const projectType = String(form.get('projectType') || '').trim();
    const message = String(form.get('message') || '').trim();

    if (!name || !email || !projectType || !message) {
      setStatus('Please complete each field before opening the draft.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus('Please enter a valid email address.');
      return;
    }

    const contactEmail = String(import.meta.env.VITE_CONTACT_EMAIL || '').trim();
    const subject = encodeURIComponent(`${projectType} enquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Arbaz,\n\nI’d like to discuss a ${projectType.toLowerCase()} project.\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`,
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setStatus('Your email app should open with a prepared project brief.');
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
          <p>Complete a short brief and I’ll prepare it as a draft in your email app. Your details are not stored by this website.</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>
              Your name
              <input name="name" autoComplete="name" required maxLength={80} placeholder="Name" />
            </label>
            <label>
              Email address
              <input name="email" type="email" autoComplete="email" required maxLength={120} placeholder="you@company.com" />
            </label>
          </div>
          <label>
            Project type
            <select name="projectType" defaultValue="" required>
              <option value="" disabled>Select a project type</option>
              <option>New website</option>
              <option>WordPress improvement</option>
              <option>Frontend development</option>
              <option>Performance optimization</option>
            </select>
          </label>
          <label>
            A little about the project
            <textarea name="message" rows={4} required maxLength={1200} placeholder="Goals, timeline and what needs improving..." />
          </label>
          {status && <p className="form-status" role="status">{status}</p>}
          <div className="brief-dialog__actions">
            <button type="submit" className="button button--primary">Open email draft <ArrowUpRight /></button>
            <button type="button" className="button button--text" onClick={closeDialog}>Cancel</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
