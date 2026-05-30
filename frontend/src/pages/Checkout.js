import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../theme';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { isMobile } = useResponsive();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [form, setForm] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.profile?.address || '',
    county: user?.profile?.county || '',
    postal_code: user?.profile?.postal_code || '',
  });
  const styles = {
  page: { backgroundColor: '#0a0a0a', minHeight: '100vh' },
  header: {
    padding: isMobile ? '40px 24px 24px' : '60px 80px 40px',
    borderBottom: '1px solid #1a1a1a',
  },
  headerTag: { fontSize: '11px', letterSpacing: '4px', color: '#555', marginBottom: '12px' },
  headerTitle: {
    fontSize: isMobile ? '32px' : '48px',
    fontWeight: '900', color: '#fff', letterSpacing: '-1px',
  },
  container: {
    padding: isMobile ? '24px' : '40px 80px 80px',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 360px',
    gap: isMobile ? '32px' : '48px',
    alignItems: 'start',
  },
  left: { display: 'flex', flexDirection: 'column', gap: '40px' },
  section: { display: 'flex', flexDirection: 'column', gap: '16px' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  sectionTag: { fontSize: '11px', letterSpacing: '4px', color: '#555', marginBottom: '4px' },
  changeLink: { fontSize: '12px', color: '#888', letterSpacing: '1px' },
  methodGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: '12px',
  },
  methodBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
    padding: isMobile ? '16px' : '24px',
    border: '1px solid #222', backgroundColor: '#111',
    cursor: 'pointer', borderRadius: '2px', transition: 'all 0.2s',
  },
  methodActive: { border: '1px solid #fff', backgroundColor: '#1a1a1a' },
  methodIcon: { fontSize: '24px' },
  methodLabel: { fontSize: '13px', color: '#fff', fontWeight: '600', letterSpacing: '0.5px' },
  methodPrice: { fontSize: '11px', color: '#888', letterSpacing: '1px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '11px', letterSpacing: '2px', color: '#555' },
  input: {
    padding: '14px 16px', backgroundColor: '#111',
    border: '1px solid #222', borderRadius: '2px',
    fontSize: '14px', color: '#fff', outline: 'none',
  },
  mpesaBox: {
    backgroundColor: '#111', border: '1px solid #222',
    padding: isMobile ? '16px' : '24px', borderRadius: '2px',
    display: 'flex', flexDirection: 'column', gap: '16px',
  },
  mpesaHeader: { display: 'flex', alignItems: 'center', gap: '12px' },
  mpesaIcon: { fontSize: '20px' },
  mpesaLabel: { fontSize: '15px', fontWeight: '700', color: '#fff', letterSpacing: '1px' },
  mpesaBadge: { fontSize: '10px', letterSpacing: '2px', color: '#2ecc71', border: '1px solid #2ecc71', padding: '2px 8px', borderRadius: '2px' },
  mpesaText: { fontSize: '13px', color: '#666', lineHeight: 1.6 },
  storeBox: { backgroundColor: '#111', border: '1px solid #222', borderRadius: '2px', overflow: 'hidden' },
  storeInfo: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid #1a1a1a' },
  storeName: { fontSize: '16px', fontWeight: '700', color: '#fff', letterSpacing: '2px', marginBottom: '4px' },
  storeAddress: { fontSize: '13px', color: '#888' },
  storeHours: { fontSize: '13px', color: '#666' },
  mapPlaceholder: {
    height: isMobile ? '160px' : '200px',
    backgroundColor: '#1a1a1a', display: 'flex',
    flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px',
  },
  mapText: { fontSize: '16px', color: '#444' },
  mapSubText: { fontSize: '12px', color: '#333', letterSpacing: '1px' },
  submitBtn: {
    backgroundColor: '#fff', color: '#000', padding: '16px',
    border: 'none', fontSize: '13px', fontWeight: '700',
    letterSpacing: '2px', cursor: 'pointer', borderRadius: '2px', marginTop: '8px',
  },
  summary: {
    backgroundColor: '#111', border: '1px solid #1a1a1a',
    padding: isMobile ? '24px' : '32px',
    position: isMobile ? 'static' : 'sticky',
    top: '100px',
  },
  summaryItems: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' },
  summaryItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  summaryItemInfo: { display: 'flex', gap: '8px', alignItems: 'center' },
  summaryItemName: { fontSize: '13px', color: '#ccc' },
  summaryItemQty: { fontSize: '12px', color: '#555' },
  summaryItemPrice: { fontSize: '13px', color: '#fff', fontWeight: '500' },
  summaryDivider: { height: '1px', backgroundColor: '#1a1a1a', margin: '16px 0' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginBottom: '8px' },
  summaryTotal: { display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700', color: '#fff', marginTop: '8px' },
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      ...form,
      total_price: totalPrice + (deliveryMethod === 'delivery' ? 200 : 0),
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
    <div style={styles.page}>
      <div style={styles.header}>
        <p style={styles.headerTag}>CHECKOUT</p>
        <h1 style={styles.headerTitle}>Complete Your Order</h1>
      </div>

      <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.left}
        >
          {/* Delivery Method */}
          <div style={styles.section}>
            <p style={styles.sectionTag}>DELIVERY METHOD</p>
            <div style={styles.methodGrid}>
              <button
                style={{
                  ...styles.methodBtn,
                  ...(deliveryMethod === 'delivery' ? styles.methodActive : {}),
                }}
                onClick={() => setDeliveryMethod('delivery')}
                type='button'
              >
                <span style={styles.methodIcon}>🚚</span>
                <span style={styles.methodLabel}>Home Delivery</span>
                <span style={styles.methodPrice}>KSh 200</span>
              </button>
              <button
                style={{
                  ...styles.methodBtn,
                  ...(deliveryMethod === 'pickup' ? styles.methodActive : {}),
                }}
                onClick={() => setDeliveryMethod('pickup')}
                type='button'
              >
                <span style={styles.methodIcon}>🏪</span>
                <span style={styles.methodLabel}>Pick Up at Store</span>
                <span style={styles.methodPrice}>Free</span>
              </button>
            </div>
          </div>

          {/* Delivery Details or Store Location */}
          {deliveryMethod === 'delivery' ? (
            <form onSubmit={handleSubmit} style={styles.section}>
              <div style={styles.sectionHeader}>
                <p style={styles.sectionTag}>DELIVERY DETAILS</p>
                {user?.profile?.address && (
                  <Link to='/profile' style={styles.changeLink}>
                    Change address →
                  </Link>
                )}
              </div>
              {[
                { name: 'full_name', label: 'FULL NAME', placeholder: 'John Kamau' },
                { name: 'email', label: 'EMAIL ADDRESS', placeholder: 'john@email.com' },
                { name: 'phone', label: 'PHONE NUMBER', placeholder: '07XXXXXXXX' },
                { name: 'address', label: 'DELIVERY ADDRESS', placeholder: 'Street, City' },
                { name: 'county', label: 'COUNTY', placeholder: 'Nairobi' },
                { name: 'postal_code', label: 'POSTAL CODE', placeholder: '00100' },
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

              {/* Payment */}
              <p style={styles.sectionTag}>PAYMENT METHOD</p>
              <div style={styles.mpesaBox}>
                <div style={styles.mpesaHeader}>
                  <span style={styles.mpesaIcon}>📱</span>
                  <span style={styles.mpesaLabel}>M-Pesa</span>
                  <span style={styles.mpesaBadge}>ONLY OPTION</span>
                </div>
                <p style={styles.mpesaText}>
                  You will receive an M-Pesa prompt on your phone after placing the order.
                </p>
                <div style={styles.formGroup}>
                  <label style={styles.label}>M-PESA PHONE NUMBER</label>
                  <input
                    style={styles.input}
                    type='text'
                    placeholder='07XXXXXXXX'
                    required
                  />
                </div>
              </div>

              <button
                type='submit'
                style={styles.submitBtn}
                disabled={loading}
              >
                {loading ? 'PLACING ORDER...' : 'PLACE ORDER →'}
              </button>
            </form>
          ) : (
            <div style={styles.section}>
              <p style={styles.sectionTag}>STORE LOCATION</p>
              <div style={styles.storeBox}>
                <div style={styles.storeInfo}>
                  <p style={styles.storeName}>LUX FASHION STORE</p>
                  <p style={styles.storeAddress}>📍 KISUMU, Kenya</p>
                  <p style={styles.storeHours}>🕐 Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p style={styles.storeHours}>🕐 Sun: 11:00 AM - 5:00 PM</p>
                </div>
                <div style={styles.mapPlaceholder}>
                  <p style={styles.mapText}>📍 Map coming soon</p>
                  <p style={styles.mapSubText}>Exact location will be provided here</p>
                </div>
              </div>

              {/* Pickup form */}
              <form onSubmit={handleSubmit}>
                <p style={styles.sectionTag} style={{ marginTop: '32px' }}>YOUR DETAILS</p>
                {[
                  { name: 'full_name', label: 'FULL NAME', placeholder: 'John Kamau' },
                  { name: 'phone', label: 'PHONE NUMBER', placeholder: '07XXXXXXXX' },
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

                {/* Payment */}
                <p style={styles.sectionTag}>PAYMENT METHOD</p>
                <div style={styles.mpesaBox}>
                  <div style={styles.mpesaHeader}>
                    <span style={styles.mpesaIcon}>📱</span>
                    <span style={styles.mpesaLabel}>M-Pesa</span>
                    <span style={styles.mpesaBadge}>ONLY OPTION</span>
                  </div>
                  <p style={styles.mpesaText}>
                    You will receive an M-Pesa prompt on your phone after placing the order.
                  </p>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>M-PESA PHONE NUMBER</label>
                    <input
                      style={styles.input}
                      type='text'
                      placeholder='07XXXXXXXX'
                      required
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  style={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? 'PLACING ORDER...' : 'PLACE ORDER →'}
                </button>
              </form>
            </div>
          )}
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.summary}
        >
          <p style={styles.sectionTag}>ORDER SUMMARY</p>
          <div style={styles.summaryItems}>
            {cart.map(item => (
              <div key={item.id} style={styles.summaryItem}>
                <div style={styles.summaryItemInfo}>
                  <p style={styles.summaryItemName}>{item.name}</p>
                  <p style={styles.summaryItemQty}>x{item.quantity}</p>
                </div>
                <span style={styles.summaryItemPrice}>
                  KSh {Number(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div style={styles.summaryDivider} />
          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>KSh {Number(totalPrice).toLocaleString()}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Delivery</span>
            <span>{deliveryMethod === 'delivery' ? 'KSh 200' : 'Free'}</span>
          </div>
          <div style={styles.summaryDivider} />
          <div style={styles.summaryTotal}>
            <span>Total</span>
            <span>KSh {Number(totalPrice + (deliveryMethod === 'delivery' ? 200 : 0)).toLocaleString()}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};



export default Checkout;