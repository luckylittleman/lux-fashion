import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
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

    if (!form.email && !form.phone) {
      setError('Please provide either an email or phone number');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const data = {
        full_name: form.full_name,
        password: form.password,
      };
      if (form.email) data.email = form.email;
      if (form.phone) data.phone = form.phone;

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
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create an account</h2>
        <p style={styles.subtitle}>Join Lux Fashion today</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full name</label>
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
            <label style={styles.label}>Email address <span style={styles.optional}>(optional if phone provided)</span></label>
            <input
              style={styles.input}
              type='email'
              name='email'
              placeholder='john@email.com'
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone number <span style={styles.optional}>(optional if email provided)</span></label>
            <input
              style={styles.input}
              type='text'
              name='phone'
              placeholder='07XXXXXXXX'
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
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
            <label style={styles.label}>Confirm password</label>
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
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to='/login' style={styles.link}>Sign in</Link>
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
  optional: {
    fontSize: '11px',
    color: '#aaa',
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

export default Signup;