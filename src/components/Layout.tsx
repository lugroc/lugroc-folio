import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logout, validateSession, getCustomer } from '../api/client';
import { useLanguage } from '../context/language-context';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const sid = localStorage.getItem('sessionId');
    if (!sid) { navigate('/'); return; }
    validateSession(sid).then(data => {
      if (!data.valid) {
        localStorage.removeItem('sessionId');
        navigate('/');
        return;
      }
      setCustomerId(data.customerId);
      setExpiresAt(data.expiresAt);
      if (data.customerId) {
        getCustomer(data.customerId).then(c => setCustomerName(`${c.firstName} ${c.lastName}`)).catch(() => {});
      }
    });
  }, [navigate]);

  useEffect(() => {
    const expires = expiresAt;
    if (expires === null) return;
    function tick() {
      const remaining = new Date(expires!).getTime() - Date.now();
      if (remaining <= 0) {
        setTimeLeft(t.layout.expired);
        localStorage.removeItem('sessionId');
        navigate('/');
        return;
      }
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      setTimeLeft(`${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`);
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, navigate, t.layout.expired]);

  const isLow = expiresAt && new Date(expiresAt).getTime() - Date.now() < 300000;

  async function handleLogout() {
    const sid = localStorage.getItem('sessionId');
    if (sid) await logout(sid);
    localStorage.removeItem('sessionId');
    navigate('/');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif', background: '#f0f2f5' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.5rem', background: '#1a1a2e', color: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>LucianoGro</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {timeLeft && (
            <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: isLow ? '#ff6b6b' : '#a8e6cf' }}>
              {t.layout.session}: {timeLeft}
            </span>
          )}
          {customerName && <span style={{ fontSize: '0.85rem', color: '#ccc' }}>{customerName}</span>}
          <button onClick={handleLogout} style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem' }}>{t.layout.logout}</button>
        </div>
      </header>
      <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
    </div>
  );
}
