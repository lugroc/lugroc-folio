import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/client';
import { useToast } from '../context/toast-context';
import { HiArrowLeft } from 'react-icons/hi';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    try {
      await register(form.firstName, form.lastName, form.email, form.password);
      showToast('Registration successful! You can now log in.', 'success');
      navigate('/login');
    } catch {
      setError('Registration failed');
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Link
          to="/"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4 transition"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="First Name"
            value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })}
            required
          />
          <input
            style={styles.input}
            placeholder="Last Name"
            value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password (min 8 characters)"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            minLength={8}
          />
          <button style={styles.btn} type="submit">
            Register
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
        <p style={styles.link}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: 'Inter, Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    background: '#f0f2f5',
  },
  card: {
    background: 'white',
    padding: '2rem',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: 360,
  },
  title: { textAlign: 'center', color: '#333', marginBottom: 16 },
  input: {
    width: '100%',
    padding: 10,
    margin: '8px 0',
    border: '1px solid #ddd',
    borderRadius: 4,
    boxSizing: 'border-box' as const,
  },
  btn: {
    width: '100%',
    padding: 10,
    background: '#42b72a',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 16,
  },
  error: { color: '#d32f2f', textAlign: 'center' as const, marginTop: 8 },
  link: { textAlign: 'center' as const, marginTop: 12 },
};
