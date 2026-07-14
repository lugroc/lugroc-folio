import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSession, getProducts, createProduct, updateProduct, deleteProduct } from '../api/client';
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
  updatedAt?: string;
}

const emptyForm = { name: '', sku: '', description: '', price: 0, quantity: 0, category: '' };

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [session, setSession] = useState<SessionInfo>(null);
  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem('product_cache');
      if (raw) return JSON.parse(raw).products;
    } catch {}
    return [];
  });
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  function versionKey(products: Product[]): string {
    return products.map(p => `${p.id}:${p.updatedAt ?? ''}`).join('|');
  }

  function mergeLists(current: Product[], fresh: Product[]): Product[] {
    const curV = versionKey(current);
    const newV = versionKey(fresh);
    if (curV === newV) return current;

    const map = new Map(current.map(p => [p.id, p]));
    for (const p of fresh) map.set(p.id, p);
    const merged = Array.from(map.values());
    localStorage.setItem('product_cache', JSON.stringify({ products: merged, cachedAt: Date.now() }));
    return merged;
  }

  const load = useCallback(async (skipCache?: boolean) => {
    setLoading(true);
    try {
      const fresh = await getProducts();
      setAllProducts(prev => skipCache ? fresh : mergeLists(prev, fresh));
      if (skipCache) localStorage.setItem('product_cache', JSON.stringify({ products: fresh, cachedAt: Date.now() }));
    } catch {}
    setLoading(false);
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return allProducts;
    const q = search.toLowerCase();
    return allProducts.filter(p =>
      [p.name, p.sku, p.category, p.description].some(f => f?.toLowerCase().includes(q))
    );
  }, [allProducts, search]);

  useEffect(() => {
    const sid = localStorage.getItem('sessionId');
    if (!sid) { navigate('/'); return; }
    validateSession(sid).then(info => {
      if (!info.valid) { localStorage.removeItem('sessionId'); navigate('/'); return; }
      setSession(info);
    });
  }, [navigate]);

  useEffect(() => {
    if (session?.valid) {
      const raw = localStorage.getItem('product_cache');
      const cached = raw ? JSON.parse(raw) : null;
      if (!cached || Date.now() - cached.cachedAt > 300000) {
        load(true);
      } else {
        load();
      }
    }
  }, [session, load]);

  const handleSave = async () => {
    if (editing) {
      await updateProduct(editing.id, form);
    } else {
      await createProduct(form);
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    load(true);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    load(true);
  };

  const handleEdit = (p: Product) => {
    setForm({ name: p.name, sku: p.sku || '', description: p.description || '', price: p.price, quantity: p.quantity, category: p.category || '' });
    setEditing(p);
    setShowForm(true);
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
  };

  if (!session) return <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300">{t.layout.loadingDashboard}</h2>;

  const remaining = session.expiresAt ? new Date(session.expiresAt).getTime() - Date.now() : 0;
  const hours = Math.max(0, Math.floor(remaining / 3600000));
  const minutes = Math.max(0, Math.floor((remaining % 3600000) / 60000));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">{t.dashboard.heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-3">
            <HiUser className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">{t.dashboard.userId}</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">#{session.customerId}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-3">
            <HiCheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">{t.dashboard.sessionStatus}</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">{t.dashboard.online}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-3">
            <HiClock className="w-6 h-6 text-purple-500" />
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">{t.dashboard.timeRemaining}</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{hours}h {minutes.toString().padStart(2, '0')}m</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HiBookOpen className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">API Documentation</span>
          </div>
          <a
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            Open Docs
          </a>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{t.inventory.heading}</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                className="pl-9 pr-3 py-2 border dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
                placeholder={t.inventory.search}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button onClick={openCreate} className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              <HiPlus className="w-4 h-4" />
              {t.inventory.add}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-6 p-4 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <input className="px-3 py-2 border dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700" placeholder={t.inventory.name} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input className="px-3 py-2 border dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700" placeholder={t.inventory.sku} value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} />
              <input className="px-3 py-2 border dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700" placeholder={t.inventory.category} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
              <input className="px-3 py-2 border dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700" placeholder={t.inventory.price} type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))} />
              <input className="px-3 py-2 border dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700" placeholder={t.inventory.quantity} type="number" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: parseInt(e.target.value) || 0 }))} />
              <input className="px-3 py-2 border dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700" placeholder={t.inventory.description} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="bg-green-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-green-700 transition">{t.inventory.save}</button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-gray-600 dark:text-gray-400 px-4 py-1.5 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition">{t.inventory.cancel}</button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-400 dark:text-gray-500 py-8">{t.layout.loadingDashboard}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 py-8">{t.inventory.empty}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700 text-left text-gray-500 dark:text-gray-400">
                  <th className="pb-2 pr-4 font-medium">{t.inventory.name}</th>
                  <th className="pb-2 pr-4 font-medium hidden sm:table-cell">{t.inventory.sku}</th>
                  <th className="pb-2 pr-4 font-medium">{t.inventory.price}</th>
                  <th className="pb-2 pr-4 font-medium">{t.inventory.quantity}</th>
                  <th className="pb-2 pr-4 font-medium hidden md:table-cell">{t.inventory.category}</th>
                  <th className="pb-2 font-medium" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-gray-100">{p.name}</td>
                    <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400 hidden sm:table-cell">{p.sku}</td>
                    <td className="py-2.5 pr-4 text-gray-900 dark:text-gray-100">${p.price}</td>
                    <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{p.quantity}</td>
                    <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">{p.category}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleEdit(p)} className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition" title={t.inventory.edit}><HiPencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition" title={t.inventory.del}><HiTrash className="w-4 h-4" /></button>
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
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <HiShieldCheck className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            {t.dashboard.sessionDetails}
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>{t.dashboard.sessionId}: <span className="font-mono text-xs">{localStorage.getItem('sessionId')}</span></p>
            <p>{t.dashboard.expiresAt}: {new Date(session.expiresAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
