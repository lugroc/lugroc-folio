import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/client';
import { useToast } from '../context/toast-context';
import { HiArrowLeft } from 'react-icons/hi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const sessionId = await login(email, password);
      localStorage.setItem('sessionId', sessionId);
      showToast('Login successful!', 'success');
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
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
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button style={styles.btn} type="submit">
            Login
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
        <p style={styles.link}>
          Don't have an account? <Link to="/register">Register</Link>
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
    background: '#1877f2',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 16,
  },
  error: { color: '#d32f2f', textAlign: 'center' as const, marginTop: 8 },
  link: { textAlign: 'center' as const, marginTop: 12 },
};
