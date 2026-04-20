import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(identifier, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email/phone or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Sign in to your Lux Fashion account</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email or phone number</label>
            <input
              style={styles.input}
              type='text'
              placeholder='email@example.com or 07XXXXXXXX'
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            style={styles.btn}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{' '}
          <Link to='/signup' style={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#999',
    marginBottom: '28px',
  },
  error: {
    backgroundColor: '#fef2f2',
    color: '#e74c3c',
    padding: '10px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    marginBottom: '16px',
    border: '1px solid #fecaca',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    color: '#555',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    color: '#333',
    outline: 'none',
  },
  btn: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '8px',
  },
  footer: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#777',
    marginTop: '24px',
  },
  link: {
    color: '#333',
    fontWeight: '500',
    textDecoration: 'underline',
  },
};

export default Login;