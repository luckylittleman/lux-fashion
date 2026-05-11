import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (method === 'email' && !form.email) {
      setError('Please enter your email address');
      return;
    }
    if (method === 'phone' && !form.phone) {
      setError('Please enter your phone number');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

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

  return (
    <div style={styles.page}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.card}
      >
        <p style={styles.tag}>JOIN LUX FASHION</p>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Sign up and start shopping today</p>

        <div style={styles.toggle}>
          <button
            style={{
              ...styles.toggleBtn,
              ...(method === 'email' ? styles.toggleActive : {}),
            }}
            onClick={() => setMethod('email')}
            type='button'
          >
            EMAIL
          </button>
          <button
            style={{
              ...styles.toggleBtn,
              ...(method === 'phone' ? styles.toggleActive : {}),
            }}
            onClick={() => setMethod('phone')}
            type='button'
          >
            PHONE
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.error}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              {method === 'email' ? 'EMAIL ADDRESS' : 'PHONE NUMBER'}
            </label>
            <input
              style={styles.input}
              type={method === 'email' ? 'email' : 'text'}
              name={method === 'email' ? 'email' : 'phone'}
              placeholder={method === 'email' ? 'john@email.com' : '07XXXXXXXX'}
              value={method === 'email' ? form.email : form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>FULL NAME</label>
            <input
              style={styles.input}
              type='text'
              name='full_name'
              placeholder='John Kamau'
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>PASSWORD</label>
            <input
              style={styles.input}
              type='password'
              name='password'
              placeholder='At least 6 characters'
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>CONFIRM PASSWORD</label>
            <input
              style={styles.input}
              type='password'
              name='confirmPassword'
              placeholder='Repeat your password'
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type='submit'
            style={styles.btn}
            disabled={loading}
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT →'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to='/login' style={styles.link}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#0a0a0a',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  card: {
    backgroundColor: '#111',
    border: '1px solid #1a1a1a',
    padding: '48px',
    width: '100%',
    maxWidth: '420px',
  },
  tag: {
    fontSize: '11px',
    letterSpacing: '4px',
    color: '#555',
    marginBottom: '12px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '900',
    color: '#fff',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '32px',
  },
  toggle: {
    display: 'flex',
    border: '1px solid #222',
    borderRadius: '2px',
    overflow: 'hidden',
    marginBottom: '28px',
  },
  toggleBtn: {
    flex: 1,
    padding: '12px',
    border: 'none',
    backgroundColor: '#0a0a0a',
    color: '#555',
    fontSize: '11px',
    letterSpacing: '2px',
    cursor: 'pointer',
  },
  toggleActive: {
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: '700',
  },
  error: {
    backgroundColor: '#1a0a0a',
    color: '#e74c3c',
    padding: '12px 16px',
    fontSize: '13px',
    marginBottom: '20px',
    border: '1px solid #2a0a0a',
    letterSpacing: '0.5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#555',
  },
  input: {
    padding: '14px 16px',
    backgroundColor: '#0a0a0a',
    border: '1px solid #222',
    fontSize: '14px',
    color: '#fff',
    outline: 'none',
    borderRadius: '2px',
  },
  btn: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '14px',
    border: 'none',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '2px',
    cursor: 'pointer',
    marginTop: '8px',
    borderRadius: '2px',
  },
  footer: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#555',
    marginTop: '28px',
  },
  link: {
    color: '#fff',
    fontWeight: '600',
  },
};

export default Signup;