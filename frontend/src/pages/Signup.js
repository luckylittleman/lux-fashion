import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { THEME, typography, components } from '../theme';

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (method === 'email' && !form.email) { setError('Please enter your email address'); return; }
    if (method === 'phone' && !form.phone) { setError('Please enter your phone number'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      const data = { full_name: form.full_name, password: form.password };
      if (method === 'email') data.email = form.email;
      if (method === 'phone') data.phone = form.phone;
      await register(data);
      navigate('/');
    } catch (err) {
      if (err.response?.data) {
        const errors = err.response.data;
        const firstError = Object.values(errors)[0];
        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        setError('Something went wrong. Please try again.');
      }
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${THEME.colors.border}`,
    padding: '12px 0',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '16px',
    color: THEME.colors.onSurface,
    outline: 'none',
  };

  const labelStyle = {
    ...typography.labelSm,
    fontSize: '11px',
    color: THEME.colors.onSurfaceVariant,
    display: 'block',
    marginBottom: '8px',
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
          JOIN LUX FASHION
        </p>
        <h2 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '40px', fontWeight: 600, color: THEME.colors.onSurface, marginBottom: '8px' }}>
          Create Account
        </h2>
        <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant, marginBottom: '40px' }}>
          Sign up and start shopping today
        </p>

        {/* Toggle */}
        <div style={{ display: 'flex', border: `1px solid ${THEME.colors.border}`, marginBottom: '32px' }}>
          {['email', 'phone'].map(m => (
            <button
              key={m}
              type='button'
              onClick={() => setMethod(m)}
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={labelStyle}>
              {method === 'email' ? 'EMAIL ADDRESS' : 'PHONE NUMBER'}
            </label>
            <input
              type={method === 'email' ? 'email' : 'text'}
              name={method === 'email' ? 'email' : 'phone'}
              placeholder={method === 'email' ? 'john@email.com' : '07XXXXXXXX'}
              value={method === 'email' ? form.email : form.phone}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderBottomColor = '#000'}
              onBlur={e => e.target.style.borderBottomColor = THEME.colors.border}
            />
          </div>

          <div>
            <label style={labelStyle}>FULL NAME</label>
            <input
              type='text'
              name='full_name'
              placeholder='John Kamau'
              value={form.full_name}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderBottomColor = '#000'}
              onBlur={e => e.target.style.borderBottomColor = THEME.colors.border}
            />
          </div>

          <div>
            <label style={labelStyle}>PASSWORD</label>
            <input
              type='password'
              name='password'
              placeholder='At least 6 characters'
              value={form.password}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderBottomColor = '#000'}
              onBlur={e => e.target.style.borderBottomColor = THEME.colors.border}
            />
          </div>

          <div>
            <label style={labelStyle}>CONFIRM PASSWORD</label>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Repeat your password'
              value={form.confirmPassword}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderBottomColor = '#000'}
              onBlur={e => e.target.style.borderBottomColor = THEME.colors.border}
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            style={{ ...components.btnPrimary, width: '100%', display: 'flex', marginTop: '16px' }}
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT →'}
          </button>
        </form>

        <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant, textAlign: 'center', marginTop: '32px' }}>
          Already have an account?{' '}
          <Link to='/login' style={{ color: THEME.colors.onSurface, fontWeight: 600, borderBottom: '1px solid #000', paddingBottom: '2px' }}>
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;