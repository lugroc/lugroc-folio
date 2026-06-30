import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSession } from '../api/client';
import { HiClock, HiUser, HiCheckCircle, HiShieldCheck } from 'react-icons/hi';
import { useLanguage } from '../context/language-context';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [session, setSession] = useState<{ customerId?: number; expiresAt?: string; valid: boolean } | null>(null);

  useEffect(() => {
    const sid = localStorage.getItem('sessionId');
    if (!sid) { navigate('/'); return; }
    validateSession(sid).then(data => {
      if (!data.valid) { localStorage.removeItem('sessionId'); navigate('/'); return; }
      setSession(data);
    });
  }, [navigate]);

  if (!session) return <h2 className="text-xl font-medium text-gray-600">{t.layout.loadingDashboard}</h2>;

  const remaining = session.expiresAt ? new Date(session.expiresAt).getTime() - Date.now() : 0;
  const hours = Math.max(0, Math.floor(remaining / 3600000));
  const minutes = Math.max(0, Math.floor((remaining % 3600000) / 60000));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.dashboard.heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-3">
            <HiUser className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold text-gray-700">{t.dashboard.userId}</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">#{session.customerId}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-3">
            <HiCheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="font-semibold text-gray-700">{t.dashboard.sessionStatus}</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">{t.dashboard.online}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-3">
            <HiClock className="w-6 h-6 text-purple-500" />
            <h3 className="font-semibold text-gray-700">{t.dashboard.timeRemaining}</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{hours}h {minutes.toString().padStart(2, '0')}m</p>
        </div>
      </div>

      {session.expiresAt && (
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <HiShieldCheck className="w-5 h-5 text-gray-500" />
            {t.dashboard.sessionDetails}
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{t.dashboard.sessionId}: <span className="font-mono text-xs">{localStorage.getItem('sessionId')}</span></p>
            <p>{t.dashboard.createdAt}: {new Date(session.expiresAt).toLocaleString()}</p>
            <p>{t.dashboard.expiresAt}: {new Date(new Date(session.expiresAt).getTime() - 24 * 60 * 60 * 1000).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
