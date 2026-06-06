import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { THEME, typography, components } from '../theme';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ identifier: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.identifier, form.password);
      navigate('/');
    } catch (err) {
      setError('Invalid email/phone or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: THEME.colors.bg,
      minHeight: '100vh',
      paddingTop: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: '440px' }}
      >
        <p style={{ ...typography.labelSm, color: THEME.colors.secondary, marginBottom: '12px' }}>
          WELCOME BACK
        </p>
        <h2 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '40px', fontWeight: 600, color: THEME.colors.onSurface, marginBottom: '8px' }}>
          Sign In
        </h2>
        <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant, marginBottom: '40px' }}>
          Sign in to your Lux Fashion account
        </p>

        {/* Toggle */}
        <div style={{ display: 'flex', border: `1px solid ${THEME.colors.border}`, marginBottom: '32px' }}>
          {['email', 'phone'].map(m => (
            <button
              key={m}
              type='button'
              onClick={() => { setMethod(m); setForm({ identifier: '', password: '' }); }}
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                backgroundColor: method === m ? '#000' : 'transparent',
                color: method === m ? '#fff' : THEME.colors.onSurfaceVariant,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              backgroundColor: '#ffdad6',
              color: '#93000a',
              padding: '12px 16px',
              fontSize: '13px',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: '24px',
              border: '1px solid #ffb4ab',
            }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ ...typography.labelSm, fontSize: '11px', color: THEME.colors.onSurfaceVariant, display: 'block', marginBottom: '8px' }}>
              {method === 'email' ? 'EMAIL ADDRESS' : 'PHONE NUMBER'}
            </label>
            <input
              type={method === 'email' ? 'email' : 'text'}
              name='identifier'
              placeholder={method === 'email' ? 'john@email.com' : '07XXXXXXXX'}
              value={form.identifier}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: `1px solid ${THEME.colors.border}`,
                padding: '12px 0',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px',
                color: THEME.colors.onSurface,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderBottomColor = '#000'}
              onBlur={e => e.target.style.borderBottomColor = THEME.colors.border}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <label style={{ ...typography.labelSm, fontSize: '11px', color: THEME.colors.onSurfaceVariant, display: 'block', marginBottom: '8px' }}>
              PASSWORD
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              value={form.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: `1px solid ${THEME.colors.border}`,
                padding: '12px 0',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px',
                color: THEME.colors.onSurface,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderBottomColor = '#000'}
              onBlur={e => e.target.style.borderBottomColor = THEME.colors.border}
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            style={{ ...components.btnPrimary, width: '100%', display: 'flex' }}
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN →'}
          </button>
        </form>

        <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant, textAlign: 'center', marginTop: '32px' }}>
          Don't have an account?{' '}
          <Link to='/signup' style={{ color: THEME.colors.onSurface, fontWeight: 600, borderBottom: '1px solid #000', paddingBottom: '2px' }}>
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;