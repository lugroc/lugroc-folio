'use client';

import { useState, FormEvent } from 'react';
import SectionHeading from './SectionHeading';
import { useSectionInView } from '../lib/hooks';
import { useLanguage } from '../context/language-context';
import { useToast } from '../context/toast-context';
import { sendContact } from '../api/client';

export default function Contact() {
  const { ref } = useSectionInView('Contact');
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      await sendContact(name, email, message);
      showToast(t.contact.success, 'success');
      setName(''); setEmail(''); setMessage('');
    } catch {
      showToast(t.contact.error, 'error');
    } finally {
      setSending(false);
    }
  }

  return (
    <section ref={ref} id="contact" className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center scroll-mt-28">
      <SectionHeading>{t.contact.heading}</SectionHeading>
      <p className="text-gray-700 -mt-4 mb-8 dark:text-white/80">{t.contact.subtext}</p>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="flex gap-3">
          <input className="w-1/2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder={t.contact.namePlaceholder} value={name} onChange={e => setName(e.target.value)} required />
          <input className="w-1/2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" type="email" placeholder={t.contact.emailPlaceholder} value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <textarea className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y min-h-[120px]" placeholder={t.contact.messagePlaceholder} value={message} onChange={e => setMessage(e.target.value)} required />
        <button type="submit" disabled={sending} className="w-full py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50">{sending ? t.contact.sending : t.contact.sendBtn}</button>
      </form>
    </section>
  );
}
