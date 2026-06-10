import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { THEME, typography, components } from '../theme';

const passwordRequirements = [
  { label: 'At least 6 characters', test: (p) => p.length >= 6 },
  { label: 'At least one number', test: (p) => /\d/.test(p) },
  { label: 'At least one uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'At least one special character', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

const Signup = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const allRequirementsMet = passwordRequirements.every(req => req.test(form.password));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (method === 'email' && !form.email) { setError('Please enter your email address'); return; }
    if (method === 'phone' && !form.phone) { setError('Please enter your phone number'); return; }
    if (!allRequirementsMet) { setError('Password does not meet requirements'); return; }
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
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
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

  const wrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${THEME.colors.border}`,
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
                flex: 1, padding: '12px', border: 'none',
                backgroundColor: method === m ? '#000' : 'transparent',
                color: method === m ? '#fff' : THEME.colors.onSurfaceVariant,
                fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
                fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
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
            style={{ backgroundColor: '#ffdad6', color: '#93000a', padding: '12px 16px', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", marginBottom: '24px', border: '1px solid #ffb4ab' }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Email or Phone */}
          <div>
            <label style={labelStyle}>{method === 'email' ? 'EMAIL ADDRESS' : 'PHONE NUMBER'}</label>
            <div style={wrapperStyle}>
              <input
                type={method === 'email' ? 'email' : 'text'}
                name={method === 'email' ? 'email' : 'phone'}
                placeholder={method === 'email' ? 'john@email.com' : '07XXXXXXXX'}
                value={method === 'email' ? form.email : form.phone}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>

          {/* Full name */}
          <div>
            <label style={labelStyle}>FULL NAME</label>
            <div style={wrapperStyle}>
              <input
                type='text'
                name='full_name'
                placeholder='John Kamau'
                value={form.full_name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={labelStyle}>PASSWORD</label>
            <div style={wrapperStyle}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='At least 6 characters'
                value={form.password}
                onChange={handleChange}
                onFocus={() => setShowRequirements(true)}
                onBlur={() => setShowRequirements(false)}
                required
                style={inputStyle}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: THEME.colors.onSurfaceVariant, display: 'flex', alignItems: 'center' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {/* Password requirements */}
            {(showRequirements || form.password.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ backgroundColor: THEME.colors.surfaceContainerLow, padding: '12px 16px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}
              >
                {passwordRequirements.map((req, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: req.test(form.password) ? '#2ecc71' : '#c4c7c7' }}>
                      {req.test(form.password) ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: req.test(form.password) ? THEME.colors.onSurface : THEME.colors.onSurfaceVariant }}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label style={labelStyle}>CONFIRM PASSWORD</label>
            <div style={wrapperStyle}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                placeholder='Repeat your password'
                value={form.confirmPassword}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: THEME.colors.onSurfaceVariant, display: 'flex', alignItems: 'center' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {showConfirmPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {/* Passwords match indicator */}
            {form.confirmPassword.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: form.password === form.confirmPassword ? '#2ecc71' : '#ba1a1a' }}>
                  {form.password === form.confirmPassword ? 'check_circle' : 'cancel'}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: form.password === form.confirmPassword ? '#2ecc71' : '#ba1a1a' }}>
                  {form.password === form.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                </span>
              </div>
            )}
          </div>

          <button
            type='submit'
            disabled={loading || !allRequirementsMet}
            style={{
              ...components.btnPrimary,
              width: '100%',
              display: 'flex',
              marginTop: '8px',
              opacity: !allRequirementsMet ? 0.5 : 1,
              cursor: !allRequirementsMet ? 'not-allowed' : 'pointer',
            }}
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