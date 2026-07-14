import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSession, getProducts, createProduct, updateProduct, deleteProduct, searchProducts } from '../api/client';
import { HiClock, HiUser, HiCheckCircle, HiShieldCheck, HiPlus, HiPencil, HiTrash, HiSearch, HiBookOpen } from 'react-icons/hi';
import { useLanguage } from '../context/language-context';

type SessionInfo = { customerId?: number; expiresAt?: string; valid: boolean } | null;

interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

const emptyForm = { name: '', sku: '', description: '', price: 0, quantity: 0, category: '' };

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [session, setSession] = useState<SessionInfo>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();

  const load = useCallback(async () => {
    setLoading(true);
    try { setProducts(await getProducts()); } catch {}
    setLoading(false);
  }, []);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { load(); return; }
    setLoading(true);
    try { setProducts(await searchProducts(q)); } catch { load(); }
    setLoading(false);
  }, [load]);

  useEffect(() => {
    const sid = localStorage.getItem('sessionId');
    if (!sid) { navigate('/'); return; }
    validateSession(sid).then(info => {
      if (!info.valid) { localStorage.removeItem('sessionId'); navigate('/'); return; }
      setSession(info);
    });
  }, [navigate]);

  useEffect(() => {
    if (session?.valid) load();
  }, [session, load]);

  function handleSearchChange(value: string) {
    setSearch(value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => doSearch(value), 300);
  }

  const handleSave = async () => {
    if (editing) {
      await updateProduct(editing.id, form);
    } else {
      await createProduct(form);
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    load();
  };

  const handleEdit = (p: Product) => {
    setForm({ name: p.name, sku: p.sku || '', description: p.description || '', price: p.price, quantity: p.quantity, category: p.category || '' });
    setEditing(p);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    load();
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
  };

  if (!session) return <h2 className="text-xl font-medium text-gray-600">{t.layout.loadingDashboard}</h2>;

  const remaining = session.expiresAt ? new Date(session.expiresAt).getTime() - Date.now() : 0;
  const hours = Math.max(0, Math.floor(remaining / 3600000));
  const minutes = Math.max(0, Math.floor((remaining % 3600000) / 60000));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.dashboard.heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HiBookOpen className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">API Documentation</span>
          </div>
          <a
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition"
          >
            Open Docs
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800">{t.inventory.heading}</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                className="pl-9 pr-3 py-2 border rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
                placeholder={t.inventory.search}
                value={search}
                onChange={e => handleSearchChange(e.target.value)}
              />
            </div>
            <button onClick={openCreate} className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              <HiPlus className="w-4 h-4" />
              {t.inventory.add}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <input className="px-3 py-2 border rounded text-sm text-gray-900 dark:text-white" placeholder={t.inventory.name} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input className="px-3 py-2 border rounded text-sm text-gray-900 dark:text-white" placeholder={t.inventory.sku} value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} />
              <input className="px-3 py-2 border rounded text-sm text-gray-900 dark:text-white" placeholder={t.inventory.category} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
              <input className="px-3 py-2 border rounded text-sm text-gray-900 dark:text-white" placeholder={t.inventory.price} type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))} />
              <input className="px-3 py-2 border rounded text-sm text-gray-900 dark:text-white" placeholder={t.inventory.quantity} type="number" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: parseInt(e.target.value) || 0 }))} />
              <input className="px-3 py-2 border rounded text-sm text-gray-900 dark:text-white" placeholder={t.inventory.description} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="bg-green-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-green-700 transition">{t.inventory.save}</button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-gray-600 px-4 py-1.5 rounded text-sm hover:bg-gray-200 transition">{t.inventory.cancel}</button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-400 py-8">{t.layout.loadingDashboard}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400 py-8">{t.inventory.empty}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-2 pr-4 font-medium">{t.inventory.name}</th>
                  <th className="pb-2 pr-4 font-medium hidden sm:table-cell">{t.inventory.sku}</th>
                  <th className="pb-2 pr-4 font-medium">{t.inventory.price}</th>
                  <th className="pb-2 pr-4 font-medium">{t.inventory.quantity}</th>
                  <th className="pb-2 pr-4 font-medium hidden md:table-cell">{t.inventory.category}</th>
                  <th className="pb-2 font-medium" />
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2.5 pr-4 font-medium text-gray-900">{p.name}</td>
                    <td className="py-2.5 pr-4 text-gray-600 hidden sm:table-cell">{p.sku}</td>
                    <td className="py-2.5 pr-4 text-gray-900">${p.price}</td>
                    <td className="py-2.5 pr-4 text-gray-600">{p.quantity}</td>
                    <td className="py-2.5 pr-4 text-gray-600 hidden md:table-cell">{p.category}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleEdit(p)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition" title={t.inventory.edit}><HiPencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition" title={t.inventory.del}><HiTrash className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {session.expiresAt && (
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <HiShieldCheck className="w-5 h-5 text-gray-500" />
            {t.dashboard.sessionDetails}
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{t.dashboard.sessionId}: <span className="font-mono text-xs">{localStorage.getItem('sessionId')}</span></p>
            <p>{t.dashboard.expiresAt}: {new Date(session.expiresAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
