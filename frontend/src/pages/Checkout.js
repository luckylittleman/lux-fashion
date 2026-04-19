import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    county: '',
    postal_code: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      ...form,
      total_price: totalPrice + 200,
      items: cart.map(item => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/orders/', orderData);
      clearCart();
      navigate(`/order-success/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Checkout</h2>
      <div style={styles.layout}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.sectionTitle}>Delivery details</h3>
          {[
            { name: 'full_name', label: 'Full name', placeholder: 'John Kamau' },
            { name: 'email', label: 'Email address', placeholder: 'john@email.com' },
            { name: 'phone', label: 'Phone number', placeholder: '+254 7XX XXX XXX' },
            { name: 'address', label: 'Delivery address', placeholder: 'Street, City' },
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
                required
              />
            </div>
          ))}
          <button
            type='submit'
            style={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Placing order...' : 'Place order →'}
          </button>
        </form>

        <div style={styles.summary}>
          <h3 style={styles.sectionTitle}>Order summary</h3>
          {cart.map(item => (
            <div key={item.id} style={styles.summaryItem}>
              <span>{item.name} x{item.quantity}</span>
              <span>KSh {Number(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div style={styles.summaryRow}>
            <span>Delivery</span>
            <span>KSh 200</span>
          </div>
          <div style={styles.summaryTotal}>
            <span>Total</span>
            <span>KSh {Number(totalPrice + 200).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px' },
  title: { fontSize: '22px', fontWeight: 'bold', color: '#333', marginBottom: '28px' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  sectionTitle: { fontSize: '17px', fontWeight: 'bold', color: '#333', marginBottom: '8px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', color: '#555' },
  input: {
    padding: '10px 14px', borderRadius: '6px',
    border: '1px solid #ddd', fontSize: '14px',
    color: '#333', outline: 'none',
  },
  submitBtn: {
    backgroundColor: '#333', color: '#fff',
    padding: '14px', borderRadius: '6px',
    border: 'none', fontSize: '15px',
    fontWeight: '500', cursor: 'pointer',
    marginTop: '8px',
  },
  summary: {
    backgroundColor: '#fff', border: '1px solid #eee',
    borderRadius: '10px', padding: '24px',
    height: 'fit-content',
  },
  summaryItem: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '13px', color: '#555', marginBottom: '10px',
  },
  summaryRow: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '14px', color: '#555', marginBottom: '10px',
  },
  summaryTotal: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '16px', fontWeight: 'bold', color: '#333',
    borderTop: '1px solid #eee', paddingTop: '12px', marginTop: '8px',
  },
};

export default Checkout;