import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.avatar}>
            {user.full_name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 style={styles.name}>{user.full_name}</h2>
            <p style={styles.contact}>{user.email || user.phone}</p>
          </div>
        </div>

        {success && <div style={styles.success}>{success}</div>}
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.sectionTitle}>Personal details</h3>
          {[
            { name: 'full_name', label: 'Full name', placeholder: 'John Kamau', type: 'text' },
            { name: 'email', label: 'Email address', placeholder: 'john@email.com', type: 'email' },
            { name: 'phone', label: 'Phone number', placeholder: '07XXXXXXXX', type: 'text' },
          ].map(field => (
            <div key={field.name} style={styles.formGroup}>
              <label style={styles.label}>{field.label}</label>
              <input
                style={styles.input}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <h3 style={styles.sectionTitle}>Delivery address</h3>
          {[
            { name: 'address', label: 'Street address', placeholder: 'Street, City' },
            { name: 'county', label: 'County', placeholder: 'Nairobi' },
            { name: 'postal_code', label: 'Postal code', placeholder: '00100' },
          ].map(field => (
            <div key={field.name} style={styles.formGroup}>
              <label style={styles.label}>{field.label}</label>
              <input
                style={styles.input}
                type='text'
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <button
            type='submit'
            style={styles.saveBtn}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </form>

        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    padding: '40px',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '480px',
    height: 'fit-content',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '28px',
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '4px',
  },
  contact: {
    fontSize: '13px',
    color: '#999',
  },
  success: {
    backgroundColor: '#f0fdf4',
    color: '#2ecc71',
    padding: '10px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    marginBottom: '16px',
    border: '1px solid #bbf7d0',
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
  sectionTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#333',
    marginTop: '8px',
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
  saveBtn: {
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
  logoutBtn: {
    width: '100%',
    marginTop: '16px',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #eee',
    backgroundColor: 'transparent',
    color: '#e74c3c',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default Profile;