import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { THEME, typography, components, useResponsive } from '../theme';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useResponsive();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/orders/${id}/`)
      .then(res => { setOrder(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ backgroundColor: THEME.colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>Loading...</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: THEME.colors.bg, minHeight: '100vh', paddingTop: '64px', paddingBottom: isMobile ? '72px' : '0' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: isMobile ? '48px 24px' : '80px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#2ecc71',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '36px' }}>check</span>
          </motion.div>

          <p style={{ ...typography.labelSm, color: '#2ecc71', marginBottom: '12px' }}>ORDER CONFIRMED</p>
          <h1 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: isMobile ? '36px' : '48px', fontWeight: 600, color: THEME.colors.onSurface, marginBottom: '12px' }}>
            Thank you, {order?.full_name?.split(' ')[0]}!
          </h1>
          <p style={{ ...typography.bodyLg, color: THEME.colors.onSurfaceVariant, marginBottom: '48px', lineHeight: 1.8 }}>
            Your order #{order?.id} has been placed successfully. We'll be in touch shortly.
          </p>

          {/* Order Details */}
          <div style={{ backgroundColor: THEME.colors.surfaceContainerLow, padding: '32px', marginBottom: '32px' }}>
            <h3 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '20px', fontWeight: 500, color: THEME.colors.onSurface, marginBottom: '24px' }}>
              Order Details
            </h3>
            {[
              { label: 'ORDER ID', value: `#${order?.id}` },
              { label: 'PHONE', value: order?.phone },
              { label: 'ADDRESS', value: `${order?.address}, ${order?.county}` },
              { label: 'TOTAL PAID', value: `KSh ${Number(order?.total_price).toLocaleString()}` },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 3 ? `1px solid ${THEME.colors.border}` : 'none' }}>
                <span style={{ ...typography.labelSm, fontSize: '11px', color: THEME.colors.onSurfaceVariant }}>{row.label}</span>
                <span style={{ ...typography.bodyMd, color: THEME.colors.onSurface, fontWeight: 500 }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px' }}>
              <span style={{ ...typography.labelSm, fontSize: '11px', color: THEME.colors.onSurfaceVariant }}>STATUS</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                color: '#f39c12',
                border: '1px solid #f39c12',
                padding: '4px 12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {order?.status}
              </span>
            </div>
          </div>

          {/* Items */}
          <div style={{ marginBottom: '48px' }}>
            <h3 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '20px', fontWeight: 500, color: THEME.colors.onSurface, marginBottom: '16px' }}>
              Items Ordered
            </h3>
            {order?.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${THEME.colors.border}` }}>
                <span style={{ ...typography.bodyMd, color: THEME.colors.onSurfaceVariant }}>
                  Product #{item.product} × {item.quantity}
                </span>
                <span style={{ ...typography.bodyMd, color: THEME.colors.onSurface, fontWeight: 500 }}>
                  KSh {Number(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <Link to='/' style={{ ...components.btnPrimary, display: 'inline-flex' }}>
            CONTINUE SHOPPING →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;