import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { THEME, typography, components, useResponsive } from '../theme';

const COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
  'Thika', 'Nyeri', 'Machakos', 'Meru', 'Kisii',
  'Kakamega', 'Garissa', 'Embu', 'Malindi', 'Kitale',
];

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

const InputField = ({ name, label, placeholder, type = 'text', required = true, value, onChange}) => (
    <div style={{ marginBottom: '24px' }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={inputStyle}
        onFocus={e => e.target.style.borderBottomColor = '#000'}
        onBlur={e => e.target.style.borderBottomColor = THEME.colors.border}
      />
    </div>
);

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [form, setForm] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.profile?.address || '',
    county: user?.profile?.county || 'Nairobi',
    postal_code: user?.profile?.postal_code || '',
    mpesa_phone: user?.phone || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      address: deliveryMethod === 'pickup' ? 'Store Pickup' : form.address,
      county: deliveryMethod === 'pickup' ? 'Kisumu' : form.county,
      postal_code: form.postal_code,
      total_price: totalPrice + (deliveryMethod === 'delivery' ? 200 : 0),
      items: cart.map(item => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      // Step 1 - Create the order
      const orderRes = await axios.post('http://127.0.0.1:8000/api/orders/', orderData);
      const orderId = orderRes.data.id;

      // Step 2 - Initiate STK push
      const mpesaRes = await axios.post('http://127.0.0.1:8000/api/mpesa/stkpush/', {
        phone_number: form.mpesa_phone || form.phone,
        order_id: orderId,
      });

      const checkoutRequestId = mpesaRes.data.checkout_request_id;
      clearCart();

      // Step 3 - Navigate to success page
      navigate(`/order-success/${orderId}?checkout_request_id=${checkoutRequestId}`);

    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  

 

  return (
    <div style={{ backgroundColor: THEME.colors.bg, minHeight: '100vh', paddingTop: '64px', paddingBottom: isMobile ? '72px' : '0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '40px 24px' : '64px 64px' }}>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gap: isMobile ? '40px' : '64px', alignItems: 'start' }}>

            {/* Left */}
            <div>
              {/* Cart Items */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: isMobile ? '40px' : '56px', fontWeight: 600, lineHeight: 1.1, color: THEME.colors.onSurface, marginBottom: '8px' }}>
                  Your Shopping Bag
                </h1>
                <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant, marginBottom: '40px' }}>
                  Refined selections for the modern silhouette.
                </p>

                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '16px', marginBottom: '24px', paddingBottom: '24px', borderBottom: `1px solid ${THEME.colors.border}` }}>
                    <div style={{ aspectRatio: '4/5', overflow: 'hidden', backgroundColor: '#e8e8e8' }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="material-symbols-outlined" style={{ color: '#c4c7c7', fontSize: '20px' }}>image</span>
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{ ...typography.labelSm, color: THEME.colors.secondary, fontSize: '10px', marginBottom: '4px' }}>
                          {item.category.name.toUpperCase()}
                        </p>
                        <h4 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '16px', fontWeight: 500, color: THEME.colors.onSurface }}>
                          {item.name}
                        </h4>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ ...typography.labelSm, fontSize: '11px', color: THEME.colors.onSurfaceVariant }}>
                          QTY: {item.quantity}
                        </span>
                        <span style={{ ...typography.priceTag, color: THEME.colors.secondary, fontSize: '16px' }}>
                          KSh {Number(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Shipping Information */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginTop: '48px' }}>
                <h2 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: isMobile ? '32px' : '40px', fontWeight: 600, color: THEME.colors.onSurface, marginBottom: '32px' }}>
                  Shipping Information
                </h2>

                {/* Delivery Method */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                  {[
                    { id: 'delivery', label: 'Home Delivery', sub: 'KSh 200', icon: 'local_shipping' },
                    { id: 'pickup', label: 'Store Pickup', sub: 'FREE', icon: 'storefront' },
                  ].map(method => (
                    <button
                      key={method.id}
                      type='button'
                      onClick={() => setDeliveryMethod(method.id)}
                      style={{
                        padding: '16px',
                        border: `1px solid ${deliveryMethod === method.id ? '#000' : THEME.colors.border}`,
                        backgroundColor: deliveryMethod === method.id ? '#000' : 'transparent',
                        color: deliveryMethod === method.id ? '#fff' : THEME.colors.onSurface,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{method.icon}</span>
                      <span style={{ ...typography.labelSm, fontSize: '11px' }}>{method.label}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: method.id === 'pickup' ? '#2ecc71' : 'inherit' }}>
                        {method.sub}
                      </span>
                    </button>
                  ))}
                </div>

                {deliveryMethod === 'delivery' ? (
                  <>
                    <InputField name='full_name' label='FULL NAME' placeholder='John Kamau'  value={form.full_name} onChange={handleChange} />
                    <InputField name='email' label='EMAIL ADDRESS' placeholder='john@email.com' type='email' value={form.email} onChange={handleChange} />
                    <InputField name='phone' label='PHONE NUMBER' placeholder='07XXXXXXXX' value={form.phone} onChange={handleChange} />
                    <InputField name='address' label='STREET ADDRESS / APARTMENT' placeholder='Moi Avenue, Apt 4B' value={form.address} onChange={handleChange} />
                    <div style={{ marginBottom: '24px' }}>
                      <label style={labelStyle}>COUNTY</label>
                      <select
                        name='county'
                        value={form.county}
                        onChange={handleChange}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                      >
                        {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <InputField name='postal_code' label='POSTAL CODE' placeholder='00100' required={false} value={form.postal_code} onChange={handleChange} />
                  </>
                ) : (
                  <div style={{ backgroundColor: THEME.colors.surfaceContainerLow, padding: '24px', marginBottom: '24px' }}>
                    <p style={{ ...typography.labelSm, color: THEME.colors.secondary, marginBottom: '8px' }}>STORE LOCATION</p>
                    <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '18px', fontWeight: 500, color: THEME.colors.onSurface, marginBottom: '8px' }}>
                      Lux Fashion Flagship
                    </p>
                    <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant, marginBottom: '4px' }}>📍 Kisumu, Kenya</p>
                    <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant, marginBottom: '4px' }}>🕐 Mon–Sat: 9:00 AM – 7:00 PM</p>
                    <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>🕐 Sun: 11:00 AM – 5:00 PM</p>
                    <div style={{ height: '160px', backgroundColor: '#e8e8e8', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ ...typography.labelSm, color: THEME.colors.onSurfaceVariant }}>MAP COMING SOON</p>
                    </div>
                    <div style={{ marginTop: '24px' }}>
                      <InputField name='full_name' label='FULL NAME' placeholder='John Kamau' value={form.full_name} onChange={handleChange} />
                      <InputField name='phone' label='PHONE NUMBER' placeholder='07XXXXXXXX' value={form.phone} onChange={handleChange} />
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right - Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{ position: isMobile ? 'static' : 'sticky', top: '80px' }}
            >
              <div style={{ backgroundColor: THEME.colors.surfaceContainerLow, padding: '32px' }}>
                <h3 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '24px', fontWeight: 500, color: THEME.colors.onSurface, marginBottom: '24px' }}>
                  Order Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>Subtotal</span>
                    <span style={{ ...typography.bodyMd, color: THEME.colors.onSurface }}>KSh {Number(totalPrice).toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>Delivery Fee</span>
                    <span style={{ ...typography.bodyMd, color: deliveryMethod === 'pickup' ? '#2ecc71' : THEME.colors.onSurface, fontWeight: 600 }}>
                      {deliveryMethod === 'pickup' ? 'FREE' : 'KSh 200'}
                    </span>
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${THEME.colors.border}`, paddingTop: '24px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '22px', fontWeight: 500 }}>Total</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: THEME.colors.secondary }}>
                      KSh {Number(totalPrice + (deliveryMethod === 'delivery' ? 200 : 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* M-Pesa Section */}
                <div style={{ border: `1px solid ${THEME.colors.border}`, padding: '20px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#2ecc71', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: '12px' }}>M</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ ...typography.labelSm, fontSize: '11px', color: THEME.colors.onSurface, marginBottom: '2px' }}>PAY WITH M-PESA</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: THEME.colors.onSurfaceVariant }}>Fast, secure, and local</p>
                    </div>
                    <span className="material-symbols-outlined" style={{ color: '#2ecc71', fontSize: '20px' }}>check_circle</span>
                  </div>

                  {/* M-Pesa phone number input */}
                  <div>
                    <label style={labelStyle}>M-PESA PHONE NUMBER</label>
                    <input
                      type='text'
                      name='mpesa_phone'
                      placeholder='07XXXXXXXX'
                      value={form.mpesa_phone}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = '#000'}
                      onBlur={e => e.target.style.borderBottomColor = THEME.colors.border}
                    />
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: THEME.colors.onSurfaceVariant, marginTop: '8px' }}>
                      You will receive an STK push on this number to complete payment.
                    </p>
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  style={{ ...components.btnPrimary, width: '100%', display: 'flex', gap: '8px' }}
                >
                  {loading ? 'PROCESSING...' : 'COMPLETE ORDER →'}
                </button>

                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', color: THEME.colors.onSurfaceVariant }}>lock</span>
                  <span style={{ ...typography.labelSm, fontSize: '10px', color: THEME.colors.onSurfaceVariant }}>
                    SECURE CHECKOUT POWERED BY SAFARICOM
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;