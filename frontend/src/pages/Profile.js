import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { THEME, typography, components, useResponsive } from '../theme';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.profile?.address || '',
    county: user?.profile?.county || '',
    postal_code: user?.profile?.postal_code || '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await axios.put('http://127.0.0.1:8000/api/accounts/profile/', {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        profile: {
          address: form.address,
          county: form.county,
          postal_code: form.postal_code,
        },
      });
      updateUser(res.data);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

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

  const fields = [
    { section: 'Personal Details', items: [
      { name: 'full_name', label: 'FULL NAME', placeholder: 'John Kamau', type: 'text' },
      { name: 'email', label: 'EMAIL ADDRESS', placeholder: 'john@email.com', type: 'email' },
      { name: 'phone', label: 'PHONE NUMBER', placeholder: '07XXXXXXXX', type: 'text' },
    ]},
    { section: 'Delivery Address', items: [
      { name: 'address', label: 'STREET ADDRESS', placeholder: 'Moi Avenue, Nairobi', type: 'text' },
      { name: 'county', label: 'COUNTY', placeholder: 'Nairobi', type: 'text' },
      { name: 'postal_code', label: 'POSTAL CODE', placeholder: '00100', type: 'text' },
    ]},
  ];

  return (
    <div style={{
      backgroundColor: THEME.colors.bg,
      minHeight: '100vh',
      paddingTop: '64px',
      paddingBottom: isMobile ? '72px' : '0',
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: isMobile ? '48px 24px' : '80px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: THEME.colors.onSurface,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Bodoni Moda', serif",
              fontSize: '24px',
              fontWeight: 600,
              flexShrink: 0,
            }}>
              {user.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '28px', fontWeight: 600, color: THEME.colors.onSurface, marginBottom: '4px' }}>
                {user.full_name}
              </h2>
              <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>
                {user.email || user.phone}
              </p>
            </div>
          </div>

          {/* Messages */}
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px 16px', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", marginBottom: '24px', border: '1px solid #c3e6cb' }}
            >
              {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ backgroundColor: '#ffdad6', color: '#93000a', padding: '12px 16px', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", marginBottom: '24px', border: '1px solid #ffb4ab' }}
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {fields.map(section => (
              <div key={section.section} style={{ marginBottom: '40px' }}>
                <h3 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '22px', fontWeight: 500, color: THEME.colors.onSurface, marginBottom: '24px', paddingBottom: '12px', borderBottom: `1px solid ${THEME.colors.border}` }}>
                  {section.section}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {section.items.map(field => (
                    <div key={field.name}>
                      <label style={labelStyle}>{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={form[field.name]}
                        onChange={handleChange}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderBottomColor = '#000'}
                        onBlur={e => e.target.style.borderBottomColor = THEME.colors.border}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type='submit'
              disabled={loading}
              style={{ ...components.btnPrimary, width: '100%', display: 'flex', marginBottom: '16px' }}
            >
              {loading ? 'SAVING...' : 'SAVE CHANGES →'}
            </button>
          </form>

          <button
            onClick={handleLogout}
            style={{ ...components.btnOutline, width: '100%', display: 'flex', color: THEME.colors.error, borderColor: THEME.colors.error }}
          >
            LOG OUT
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;