'use client';

import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { login, register } from '../api/client';
import { useToast } from '../context/toast-context';
import { useLanguage } from '../context/language-context';
import { generateRandomUser } from '../lib/utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'login' | 'register';

export default function LoginModal({ isOpen, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { t } = useLanguage();

  function resetForm() {
    setEmail(''); setPassword(''); setFirstName(''); setLastName('');
    setRegEmail(''); setRegPassword(''); setError('');
  }

  function handleClose() { resetForm(); onClose(); }

  function handleGenerateRandom() {
    const user = generateRandomUser();
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setRegEmail(user.email);
    setRegPassword('Temporal123!');
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const sid = await login(email, password);
      localStorage.setItem('sessionId', sid);
      showToast(t.auth.loginSuccess, 'success');
      handleClose();
      navigate('/dashboard');
    } catch { setError(t.auth.invalidEmail); }
    finally { setLoading(false); }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (regPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await register(firstName, lastName, regEmail, regPassword);
      showToast(t.auth.registerSuccess, 'success');
      setTab('login');
      setEmail(regEmail); setPassword(regPassword);
      setFirstName(''); setLastName(''); setRegEmail(''); setRegPassword('');
    } catch { setError(t.auth.registerFailed); }
    finally { setLoading(false); }
  }

  function switchTab(t: Tab) { setTab(t); setError(''); }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleClose}>
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <div className="flex gap-4">
                <button className={`pb-2 text-sm font-medium transition border-b-2 ${tab === 'login' ? 'text-gray-900 dark:text-white border-gray-900 dark:border-white' : 'text-gray-400 border-transparent hover:text-gray-600'}`} onClick={() => switchTab('login')}>{t.auth.login}</button>
                <button className={`pb-2 text-sm font-medium transition border-b-2 ${tab === 'register' ? 'text-gray-900 dark:text-white border-gray-900 dark:border-white' : 'text-gray-400 border-transparent hover:text-gray-600'}`} onClick={() => switchTab('register')}>{t.auth.register}</button>
              </div>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"><HiX className="w-5 h-5" /></button>
            </div>

            <div className="px-6 pb-6 pt-4">
              {tab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <input className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" type="email" placeholder={t.auth.email} value={email} onChange={e => setEmail(e.target.value)} required />
                  <input className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" type="password" placeholder={t.auth.password} value={password} onChange={e => setPassword(e.target.value)} required />
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <button type="submit" disabled={loading} className="w-full py-2.5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50">{loading ? t.auth.loggingIn : t.auth.login}</button>
                  <p className="text-xs text-center text-gray-500 mt-2">{t.auth.noAccount} <button type="button" className="underline hover:text-gray-700" onClick={() => switchTab('register')}>{t.auth.register}</button></p>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3">
                  <div className="flex gap-2">
                    <input className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder={t.auth.firstName} value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    <input className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder={t.auth.lastName} value={lastName} onChange={e => setLastName(e.target.value)} required />
                  </div>
                  <input className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" type="email" placeholder={t.auth.email} value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
                  <input className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" type="password" placeholder={t.auth.password + ' (min 8)'} value={regPassword} onChange={e => setRegPassword(e.target.value)} required minLength={8} />
                  <button type="button" onClick={handleGenerateRandom} className="w-full py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-400 transition">{t.auth.generateRandom}</button>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <button type="submit" disabled={loading} className="w-full py-2.5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50">{loading ? t.auth.registering : t.auth.register}</button>
                  <p className="text-xs text-center text-gray-500 mt-2">{t.auth.hasAccount} <button type="button" className="underline hover:text-gray-700" onClick={() => switchTab('login')}>{t.auth.login}</button></p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
